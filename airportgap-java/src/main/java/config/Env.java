package config;

public class Env {
  public static String baseUrl() {
    return System.getenv().getOrDefault("BASE_URL", "https://airportgap.com/api");
  }
  public static String token() {
    return System.getenv("TOKEN");
  }
}
