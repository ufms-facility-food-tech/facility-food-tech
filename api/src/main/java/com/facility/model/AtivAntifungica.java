package com.facility.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class AtivAntifungica {



  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private String descricao;

  @ManyToOne
  @JoinColumn(name = "peptideo_id", nullable = false)
  @JsonBackReference
  @Hidden
  private Peptideo peptideo;

  public AtivAntifungica() {}

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
