package com.pizza.app.util;


import java.io.Serializable;


public class JwtResponse implements Serializable {

	private String username;
	private final String jwttoken;

	public JwtResponse(String jwttoken,String username) {
		this.jwttoken = jwttoken;
		this.username=username;
	}

	public String getToken() {
		return this.jwttoken;
	}

	public String getUsername() {
		return this.username;
	}

}