package com.pizza.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pizza.app.dao.UserRepository;
import com.pizza.app.entity.User;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserRepository userRepository;
	@GetMapping("/getUserById/{userId}")
	public ResponseEntity<?> getUserByUserId(@PathVariable ("userId") String userId){
		User user=null;
		try {
			user = userRepository.findByUsername(userId);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
}
