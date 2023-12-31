package com.danielks.UserCrud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.danielks.UserCrud")
public class UserCrudApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserCrudApplication.class, args);
	}
}