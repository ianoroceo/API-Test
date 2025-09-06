package spec.favorites;

import config.Env;
import http.ApiClient;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;
import java.util.UUID;
import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

public class FavoritesCrudTest {
  private final ApiClient api = new ApiClient(Env.baseUrl(), Env.token());

  @Test
  void createReadUpdateDeleteFavorite() {
    Assumptions.assumeTrue(Env.token() != null && !Env.token().isBlank(), "TOKEN must be set for favorites tests");

    // create
    String note = "created-by-tests-" + UUID.randomUUID();
    var createResp = given()
        .spec(api.authSpec())
        .header("Content-Type", "application/json")
        .body("{\"airport_id\":\"JFK\", \"note\":\""+note+"\"}")
        .post("/favorites")
        .then()
        .statusCode(201)
        .extract().jsonPath();

    String favId = createResp.getString("data.id");
    assertThat(favId).isNotBlank();

    // read
    var list = given().spec(api.authSpec())
        .get("/favorites")
        .then().statusCode(200)
        .extract().jsonPath().getList("data");
    assertThat(list.toString()).contains(favId);

    // update
    String newNote = note + "-updated";
    given().spec(api.authSpec())
        .header("Content-Type", "application/json")
        .body("{\"note\":\""+newNote+"\"}")
        .patch("/favorites/" + favId)
        .then().statusCode(200);

    var getOne = given().spec(api.authSpec())
        .get("/favorites/" + favId)
        .then().statusCode(200)
        .extract().jsonPath();
    assertThat(getOne.getString("data.attributes.note")).isEqualTo(newNote);

    // delete
    given().spec(api.authSpec())
        .delete("/favorites/" + favId)
        .then().statusCode(204);
  }
}
