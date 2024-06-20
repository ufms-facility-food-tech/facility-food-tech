package com.facility.dto;

import com.facility.model.NomePopular;
import com.facility.model.Organismo;
import com.facility.model.Peptideo;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class OrganismoDTO {
  private Long id;
  private String especie;
  private String origem;
  private String familia;
  private String nomeCientifico;
  List<NomePopularDTO> nomesPopulares;
  List<PeptideoDTO> peptideos;

  public OrganismoDTO(Organismo organismo) {
    this.id = organismo.getId();
    this.especie = organismo.getEspecie();
    this.origem = organismo.getOrigem();
    this.familia = organismo.getFamilia();
    this.nomeCientifico = organismo.getNomeCientifico();
    if (organismo.getNomesPopulares() != null) {
      this.nomesPopulares =
          organismo.getNomesPopulares().stream()
              .map(NomePopularDTO::new)
              .collect(Collectors.toList());
    }
    if (organismo.getPeptideos() != null) {
      this.peptideos =
          organismo.getPeptideos().stream().map(PeptideoDTO::new).collect(Collectors.toList());
    }
  }

  public OrganismoDTO() {}

  public Organismo toEntity() {
    Organismo organismo = new Organismo();
    organismo.setId(this.getId());
    organismo.setEspecie(this.getEspecie());
    organismo.setFamilia(this.getFamilia());
    organismo.setOrigem(this.getOrigem());
    organismo.setNomeCientifico(this.getNomeCientifico());

    if (this.getNomesPopulares() != null) {
      Set<NomePopular> nomesPopularesEntity = new HashSet<>();
      for (NomePopularDTO nomePopularDTO : this.getNomesPopulares()) {
        NomePopular nomePopular = new NomePopular();
        nomePopular.setId(nomePopularDTO.getId());
        nomePopular.setNome(nomePopularDTO.getNome());
        nomePopular.setOrganismo(organismo);
        nomesPopularesEntity.add(nomePopular);
      }
      organismo.setNomesPopulares(nomesPopularesEntity);
    }

    if (this.getPeptideos() != null) {
      Set<Peptideo> peptideosEntity = new HashSet<>();
      for (PeptideoDTO peptideoDTO : this.getPeptideos()) {
        peptideosEntity.add(peptideoDTO.toEntity());
      }
      organismo.setPeptideos(peptideosEntity);
    }

    return organismo;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEspecie() {
    return especie;
  }

  public void setEspecie(String especie) {
    this.especie = especie;
  }

  public String getOrigem() {
    return origem;
  }

  public void setOrigem(String origem) {
    this.origem = origem;
  }

  public String getFamilia() {
    return familia;
  }

  public void setFamilia(String familia) {
    this.familia = familia;
  }

  public String getNomeCientifico() {
    return nomeCientifico;
  }

  public void setNomeCientifico(String nomeCientifico) {
    this.nomeCientifico = nomeCientifico;
  }

  public List<NomePopularDTO> getNomesPopulares() {
    return nomesPopulares;
  }

  public void setNomesPopulares(List<NomePopularDTO> nomesPopulares) {
    this.nomesPopulares = nomesPopulares;
  }

  public List<PeptideoDTO> getPeptideos() {
    return peptideos;
  }

  public void setPeptideos(List<PeptideoDTO> peptideos) {
    this.peptideos = peptideos;
  }
}
