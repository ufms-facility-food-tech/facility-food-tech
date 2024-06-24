package com.facility.repository;

import com.facility.model.AtivAntifungica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtivAntifungicaRepository
  extends JpaRepository<AtivAntifungica, Long> {}
