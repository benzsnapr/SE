package com.example.demo;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class User {

	private @Id @GeneratedValue Long id;
	private String username;
	private String password;

	@OneToOne
	private Usertype type;

	private User() {}

	public User(String username, String password, Usertype type) {
		this.username = username;
		this.password = password;
		this.type = type;
	}
}
