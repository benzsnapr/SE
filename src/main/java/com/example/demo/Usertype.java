package com.example.demo;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Usertype {

  @Id
  @GeneratedValue
  private Long id;
  private String type;

  private Usertype() {}

  public Usertype(String type){
      this.type = type;
  }
}
