package com.facility.dto;

import com.facility.model.FuncBiologica;
import com.facility.model.Peptideo;

public class FuncBiologicaDTO {

  private Long id;
  private String descricao;
  private Peptideo peptideo;

  public FuncBiologicaDTO(FuncBiologica funcBiologica) {
    this.id = funcBiologica.getId();
    this.descricao = funcBiologica.getDescricao();
    this.peptideo = funcBiologica.getPeptideo();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Peptideo getPeptideo() {
    return peptideo;
  }

  public void setPeptideo(Peptideo peptideo) {
    this.peptideo = peptideo;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
}
