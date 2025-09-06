package http;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.Filter;
import io.restassured.filter.FilterContext;
import io.restassured.response.Response;
import io.restassured.specification.FilterableRequestSpecification;
import io.restassured.specification.FilterableResponseSpecification;
import io.restassured.specification.RequestSpecification;
import static io.restassured.RestAssured.given;

public class ApiClient {
  private final String baseUrl;
  private final String token;

  public ApiClient(String baseUrl, String token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  public RequestSpecification baseSpec() {
    return new RequestSpecBuilder()
        .setBaseUri(baseUrl)
        .addHeader("Accept", "application/json")
        .build();
  }

  public static Filter rateLimitRetry(int maxRetries, long baseMillis) {
    return (FilterableRequestSpecification req,
            FilterableResponseSpecification res,
            FilterContext ctx) -> {
      int attempts = 0;
      while (true) {
        Response r = ctx.next(req, res);
        if (r.statusCode() != 429 || attempts >= maxRetries) return r;
        long sleep = (long) (baseMillis * Math.pow(2, attempts) + Math.random() * 100);
        try { Thread.sleep(sleep); } catch (InterruptedException ignored) {}
        attempts++;
      }
    };
  }

  public RequestSpecification authSpec() {
    return new RequestSpecBuilder()
        .setBaseUri(baseUrl)
        .addHeader("Accept", "application/json")
        .addHeader("Authorization", "Bearer token=" + token)
        .addFilter(rateLimitRetry(3, 250))
        .build();
  }
}
