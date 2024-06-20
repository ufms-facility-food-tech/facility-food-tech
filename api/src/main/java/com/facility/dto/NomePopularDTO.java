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
