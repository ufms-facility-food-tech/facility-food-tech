package com.facility.dto;

import com.facility.model.Publicacao;

public class PublicacaoDTO {

  private Long id;
  private String url;

  public PublicacaoDTO(Publicacao publicacao) {
    this.id = publicacao.getId();
    this.url = publicacao.getUrl();
  }

  public PublicacaoDTO() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}
