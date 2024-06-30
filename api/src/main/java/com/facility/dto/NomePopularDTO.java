package com.facility.dto;

import com.facility.model.NomePopular;

public class NomePopularDTO {

  private Long id;
  private String nome;

  public NomePopularDTO(NomePopular nomePopular) {
    this.id = nomePopular.getId();
    this.nome = nomePopular.getNome();
  }

  public NomePopularDTO() {}

  public NomePopular toEntity() {
    NomePopular nomePopular = new NomePopular();
    nomePopular.setId(this.getId());
    nomePopular.setNome(this.getNome());
    return nomePopular;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }
}
