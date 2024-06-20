package com.facility.dto;

import com.facility.model.AtivAntibacteriana;

public class AtivAntibacterianaDTO {

  private Long id;
  private String descricao;

  public AtivAntibacterianaDTO(AtivAntibacteriana ativAntibacteriana) {
    this.id = ativAntibacteriana.getId();
    this.descricao = ativAntibacteriana.getDescricao();
  }

  public AtivAntibacterianaDTO() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
}
