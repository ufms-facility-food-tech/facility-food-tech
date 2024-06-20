package com.facility.dto;

import com.facility.model.CaracterisAdicionais;
import com.facility.model.Peptideo;

public class CaracterisAdicionaisDTO {

  private Long id;
  private String descricao;
  private Peptideo peptideo;

  public CaracterisAdicionaisDTO(CaracterisAdicionais caracterisAdicionais) {
    this.id = caracterisAdicionais.getId();
    this.descricao = caracterisAdicionais.getDescricao();
    this.peptideo = caracterisAdicionais.getPeptideo();
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
