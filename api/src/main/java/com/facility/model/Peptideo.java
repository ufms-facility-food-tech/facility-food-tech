package com.facility.model;

import com.facility.enums.TipoPeptideo;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Peptideo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String peptideo;
  private Integer quantidadeAminoacidos;
  private TipoPeptideo tipoPeptideo;
  private String sequencia;
  private String estruturaTridimensional;
  private Double massaMolecular;
  private Double impedimentoEsterico;
  private Double hidrofobicidade;
  private Double pontoIsoeletrico;
  private Double hidropatia;
  private Double anfipaticidade;
  private Double hidrofilicidade;
  private Integer cargaLiquidaTotal;
  private Double indiceBoman;
  private String descricao;

  @ManyToOne
  @JoinColumn(name = "organismo_id", nullable = false)
  private Organismo organismo;

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<FuncBiologica> funcBiologicas = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<AtivAntibacteriana> ativAntibacterianas = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<AtivAntifungica> ativAntifungicas = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<AtivCitotoxica> ativCitotoxicas = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<CasoSucesso> casosSucesso = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<CaracterisAdicionais> caracterisAdicionais = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<Publicacao> publicacoes = new HashSet<>();

  @JsonBackReference
  @Hidden
  public Organismo getOrganismo() {
    return organismo;
  }

  public void setOrganismo(Organismo organismo) {
    this.organismo = organismo;
  }

  public Peptideo() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPeptideo() {
    return peptideo;
  }

  public void setPeptideo(String peptideo) {
    this.peptideo = peptideo;
  }

  public TipoPeptideo getTipoPeptideo() {
    return tipoPeptideo;
  }

  public void setTipoPeptideo(TipoPeptideo tipoPeptideo) {
    this.tipoPeptideo = tipoPeptideo;
  }

  public String getSequencia() {
    return sequencia;
  }

  public void setSequencia(String sequencia) {
    this.sequencia = sequencia;
  }

  public String getEstruturaTridimensional() {
    return estruturaTridimensional;
  }

  public void setEstruturaTridimensional(String estruturaTridimensional) {
    this.estruturaTridimensional = estruturaTridimensional;
  }

  public Double getMassaMolecular() {
    return massaMolecular;
  }

  public void setMassaMolecular(Double massaMolecular) {
    this.massaMolecular = massaMolecular;
  }

  public Double getPontoIsoeletrico() {
    return pontoIsoeletrico;
  }

  public void setPontoIsoeletrico(Double pontoIsoeletrico) {
    this.pontoIsoeletrico = pontoIsoeletrico;
  }

  public Double getHidropatia() {
    return hidropatia;
  }

  public void setHidropatia(Double hidropatia) {
    this.hidropatia = hidropatia;
  }

  public Double getAnfipaticidade() {
    return anfipaticidade;
  }

  public void setAnfipaticidade(Double anfipaticidade) {
    this.anfipaticidade = anfipaticidade;
  }

  public Double getHidrofilicidade() {
    return hidrofilicidade;
  }

  public void setHidrofilicidade(Double hidrofilicidade) {
    this.hidrofilicidade = hidrofilicidade;
  }

  public Double getIndiceBoman() {
    return indiceBoman;
  }

  public void setIndiceBoman(Double indiceBoman) {
    this.indiceBoman = indiceBoman;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public Integer getQuantidadeAminoacidos() {
    return quantidadeAminoacidos;
  }

  public void setQuantidadeAminoacidos(Integer quantidadeAminoacidos) {
    this.quantidadeAminoacidos = quantidadeAminoacidos;
  }

  public Double getImpedimentoEsterico() {
    return impedimentoEsterico;
  }

  public void setImpedimentoEsterico(Double impedimentoEsterico) {
    this.impedimentoEsterico = impedimentoEsterico;
  }

  public Double getHidrofobicidade() {
    return hidrofobicidade;
  }

  public void setHidrofobicidade(Double hidrofobicidade) {
    this.hidrofobicidade = hidrofobicidade;
  }

  public Integer getCargaLiquidaTotal() {
    return cargaLiquidaTotal;
  }

  public void setCargaLiquidaTotal(Integer cargaLiquidaTotal) {
    this.cargaLiquidaTotal = cargaLiquidaTotal;
  }

  public Set<Publicacao> getPublicacoes() {
    return publicacoes;
  }

  public void setPublicacoes(Set<Publicacao> publicacoes) {
    this.publicacoes = publicacoes;
  }

  public Set<CaracterisAdicionais> getCaracterisAdicionais() {
    return caracterisAdicionais;
  }

  public void setCaracterisAdicionais(
    Set<CaracterisAdicionais> caracterisAdicionais
  ) {
    this.caracterisAdicionais = caracterisAdicionais;
  }

  public Set<CasoSucesso> getCasosSucesso() {
    return casosSucesso;
  }

  public void setCasosSucesso(Set<CasoSucesso> casosSucesso) {
    this.casosSucesso = casosSucesso;
  }

  public Set<AtivCitotoxica> getAtivCitotoxicas() {
    return ativCitotoxicas;
  }

  public void setAtivCitotoxicas(Set<AtivCitotoxica> ativCitotoxicas) {
    this.ativCitotoxicas = ativCitotoxicas;
  }

  public Set<AtivAntifungica> getAtivAntifungicas() {
    return ativAntifungicas;
  }

  public void setAtivAntifungicas(Set<AtivAntifungica> ativAntifungicas) {
    this.ativAntifungicas = ativAntifungicas;
  }

  public Set<AtivAntibacteriana> getAtivAntibacterianas() {
    return ativAntibacterianas;
  }

  public void setAtivAntibacterianas(
    Set<AtivAntibacteriana> ativAntibacterianas
  ) {
    this.ativAntibacterianas = ativAntibacterianas;
  }

  public Set<FuncBiologica> getFuncBiologicas() {
    return funcBiologicas;
  }

  public void setFuncBiologicas(Set<FuncBiologica> funcBiologicas) {
    this.funcBiologicas = funcBiologicas;
  }

  public void addFuncBiologica(FuncBiologica funcBiologica) {
    funcBiologicas.add(funcBiologica);
    funcBiologica.setPeptideo(this);
  }

  public void removeFuncBiologica(FuncBiologica funcBiologica) {
    funcBiologicas.remove(funcBiologica);
    funcBiologica.setPeptideo(null);
  }

  public void addAtivAntibacteriana(AtivAntibacteriana ativAntibacteriana) {
    ativAntibacterianas.add(ativAntibacteriana);
    ativAntibacteriana.setPeptideo(this);
  }

  public void removeAtivAntibacteriana(AtivAntibacteriana ativAntibacteriana) {
    ativAntibacterianas.remove(ativAntibacteriana);
    ativAntibacteriana.setPeptideo(null);
  }

  public void addAtivAntifungica(AtivAntifungica ativAntifungica) {
    ativAntifungicas.add(ativAntifungica);
    ativAntifungica.setPeptideo(this);
  }

  public void removeAtivAntifungica(AtivAntifungica ativAntifungica) {
    ativAntifungicas.remove(ativAntifungica);
    ativAntifungica.setPeptideo(null);
  }

  public void addAtivCitotoxica(AtivCitotoxica ativCitotoxica) {
    ativCitotoxicas.add(ativCitotoxica);
    ativCitotoxica.setPeptideo(this);
  }

  public void removeAtivCitotoxica(AtivCitotoxica ativCitotoxica) {
    ativCitotoxicas.remove(ativCitotoxica);
    ativCitotoxica.setPeptideo(null);
  }

  public void addCasoSucesso(CasoSucesso casoSucesso) {
    casosSucesso.add(casoSucesso);
    casoSucesso.setPeptideo(this);
  }

  public void removeCasoSucesso(CasoSucesso casoSucesso) {
    casosSucesso.remove(casoSucesso);
    casoSucesso.setPeptideo(null);
  }

  public void addCaracterisAdicionais(
    CaracterisAdicionais caracteristicasAdicionais
  ) {
    caracterisAdicionais.add(caracteristicasAdicionais);
    caracteristicasAdicionais.setPeptideo(this);
  }

  public void removeCaracterisAdicionais(
    CaracterisAdicionais caracteristicasAdicionais
  ) {
    caracterisAdicionais.remove(caracteristicasAdicionais);
    caracteristicasAdicionais.setPeptideo(null);
  }

  public void addPublicacao(Publicacao publicacao) {
    publicacoes.add(publicacao);
    publicacao.setPeptideo(this);
  }

  public void removePublicacao(Publicacao publicacao) {
    publicacoes.remove(publicacao);
    publicacao.setPeptideo(null);
  }
}
