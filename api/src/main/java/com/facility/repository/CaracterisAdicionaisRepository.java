package com.facility.repository;

import com.facility.model.CaracterisAdicionais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracterisAdicionaisRepository extends JpaRepository<CaracterisAdicionais, Long> {}
