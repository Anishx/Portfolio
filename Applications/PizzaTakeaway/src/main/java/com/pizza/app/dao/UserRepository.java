package com.pizza.app.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pizza.app.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);

}
