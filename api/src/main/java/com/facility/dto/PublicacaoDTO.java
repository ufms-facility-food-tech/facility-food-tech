package com.facility.dto;

import com.facility.model.Peptideo;
import com.facility.model.Publicacao;

public class PublicacaoDTO {

  private Long id;
  private String url;
  private Peptideo peptideo;

  public PublicacaoDTO(Publicacao publicac) {

    this.id = publicac.getId();
    this.url = publicac.getUrl();
    this.peptideo = publicac.getPeptideo();
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

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}
