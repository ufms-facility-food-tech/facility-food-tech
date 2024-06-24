package com.facility.repository;

import com.facility.model.AtivAntibacteriana;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtivAntibacterianaRepository
  extends JpaRepository<AtivAntibacteriana, Long> {}
