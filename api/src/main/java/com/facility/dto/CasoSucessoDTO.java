package com.facility.dto;

import com.facility.model.CasoSucesso;

public class CasoSucessoDTO {

  private Long id;
  private String caso;

  public CasoSucessoDTO(CasoSucesso casoSucesso) {
    this.id = casoSucesso.getId();
    this.caso = casoSucesso.getCaso();
  }

  public CasoSucessoDTO() {}

  public CasoSucesso toEntity() {
    CasoSucesso casoSucesso = new CasoSucesso();
    casoSucesso.setId(this.getId());
    casoSucesso.setCaso(this.getCaso());
    return casoSucesso;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCaso() {
    return caso;
  }

  public void setCaso(String caso) {
    this.caso = caso;
  }
}
