package com.facility.repository;

import com.facility.model.NomePopular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NomePopularRepository extends JpaRepository<NomePopular, Long> {}
