package com.facility.repository;

import com.facility.model.CasoSucesso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CasoSucessoRepository
  extends JpaRepository<CasoSucesso, Long> {}
