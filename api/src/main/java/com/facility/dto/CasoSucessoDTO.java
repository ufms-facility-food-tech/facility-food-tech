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
