package com.facility.model;

import jakarta.persistence.criteria.Join;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.JoinType;

public class PeptideoSpecifications {

  private static final Log log = LogFactory.getLog(
    PeptideoSpecifications.class
  );

  public static Specification<Peptideo> hasNomePopular(String nomePopular) {
    return (
      (root, query, cb) -> {
        if (nomePopular == null || nomePopular.isEmpty()) {
          return cb.conjunction();
        }

        try {
          var organismo = root.fetch("organismo", JoinType.LEFT);
          var nomesPopulares = organismo.fetch("nomePopular", JoinType.LEFT);
          
          return cb.like(
            cb.lower(root.get("organismo").get("nomePopular")),
            "%" + nomePopular.toLowerCase() + "%"
          );
        } catch (IllegalArgumentException e) {
          log.error(e.getMessage());
          return cb.conjunction();
        }
      }
    );
  }
}
