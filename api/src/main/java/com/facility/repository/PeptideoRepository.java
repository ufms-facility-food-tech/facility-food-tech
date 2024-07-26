package com.facility.repository;

import com.facility.model.Peptideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PeptideoRepository
  extends JpaRepository<Peptideo, Long>, JpaSpecificationExecutor<Peptideo> {}
