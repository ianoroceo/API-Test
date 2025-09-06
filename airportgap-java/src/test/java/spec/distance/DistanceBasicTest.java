package spec.distance;

import config.Env;
import http.ApiClient;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

public class DistanceBasicTest {
  private final ApiClient api = new ApiClient(Env.baseUrl(), Env.token());

  @Test
  void distanceBetweenKIXandNRT_hasUnits() {
    var body = "{\"from\":\"KIX\", \"to\":\"NRT\"}";
    var resp = given()
        .spec(api.baseSpec())
        .header("Content-Type", "application/json")
        .body(body)
        .post("/airports/distance")
        .then()
        .statusCode(200)
        .extract().jsonPath();

    Double miles = resp.getDouble("data.attributes.miles");
    Double km = resp.getDouble("data.attributes.kilometers");
    Double nm = resp.getDouble("data.attributes.nautical_miles");

    assertThat(miles).isNotNull().isGreaterThanOrEqualTo(0.0);
    assertThat(km).isNotNull().isGreaterThanOrEqualTo(0.0);
    assertThat(nm).isNotNull().isGreaterThanOrEqualTo(0.0);
  }
}
