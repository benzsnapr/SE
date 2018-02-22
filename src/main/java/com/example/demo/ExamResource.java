package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class ExamResource {

	private @Id @GeneratedValue Long id;
	private String Nametest;
	private String Size;
	private String link;
	@ManyToOne
	private Member member;

    private ExamResource(){}
	public ExamResource(String link,String Nametest,String Size,Member member) {
    	this.link = link;
		this.Nametest = Nametest;
		this.Size = Size;
		this.member = member;



	}
}