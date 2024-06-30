package com.facility.dto;

import com.facility.model.CaracterisAdicionais;

public class CaracterisAdicionaisDTO {

  private Long id;
  private String descricao;

  public CaracterisAdicionaisDTO(CaracterisAdicionais caracterisAdicionais) {
    this.id = caracterisAdicionais.getId();
    this.descricao = caracterisAdicionais.getDescricao();
  }

  public CaracterisAdicionaisDTO() {}

  public CaracterisAdicionais toEntity() {
    CaracterisAdicionais caracterisAdicionais = new CaracterisAdicionais();
    caracterisAdicionais.setId(this.getId());
    caracterisAdicionais.setDescricao(this.getDescricao());
    return caracterisAdicionais;
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
