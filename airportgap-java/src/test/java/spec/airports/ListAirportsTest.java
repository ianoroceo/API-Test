package spec.airports;

import config.Env;
import http.ApiClient;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

public class ListAirportsTest {
  private final ApiClient api = new ApiClient(Env.baseUrl(), Env.token());

  @Test @Tag("smoke")
  void firstPageHasThirtyItemsAndLinks() {
    var resp = given()
        .spec(api.baseSpec())
        .get("/airports")
        .then()
        .statusCode(200)
        .extract().jsonPath();

    var data = resp.getList("data");
    assertThat(data).hasSize(30);
    assertThat(resp.getString("links.self")).isNotBlank();
    assertThat(resp.getString("links.first")).isNotBlank();
    assertThat(resp.getString("links.last")).isNotBlank();
  }
}
