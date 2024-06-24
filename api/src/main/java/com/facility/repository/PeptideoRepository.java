package com.facility.repository;

import com.facility.enums.TipoPeptideo;
import com.facility.model.Peptideo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeptideoRepository extends JpaRepository<Peptideo, Long> {
  List<Peptideo> findByTipoPeptideo(TipoPeptideo tipoPeptideo);
}
