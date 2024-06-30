package com.facility.dto;

import com.facility.model.FuncBiologica;

public class FuncBiologicaDTO {

  private Long id;
  private String descricao;

  public FuncBiologicaDTO(FuncBiologica funcBiologica) {
    this.id = funcBiologica.getId();
    this.descricao = funcBiologica.getDescricao();
  }

  public FuncBiologicaDTO() {}

  public FuncBiologica toEntity() {
    FuncBiologica funcBiologica = new FuncBiologica();
    funcBiologica.setId(this.getId());
    funcBiologica.setDescricao(this.getDescricao());
    return funcBiologica;
  }

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
