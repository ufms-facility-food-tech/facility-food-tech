package com.facility.model;

import com.facility.enums.TipoPeptideo;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

  private String nome;
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

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> funcaoBiologica = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> atividadeAntibacteriana = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> atividadeAntifungica = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> atividadeCitotoxica = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> casoSucesso = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> caracteristicasAdicionais = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<Publicacao> publicacao = new HashSet<>();

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

  public String getNome() {
    return nome;
  }

  public void setNome(String peptideo) {
    this.nome = peptideo;
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

  public Set<Publicacao> getPublicacao() {
    return publicacao;
  }

  public void setPublicacao(Set<Publicacao> publicacao) {
    this.publicacao = publicacao;
  }

  public void addPublicacao(Publicacao publicacao) {
    this.publicacao.add(publicacao);
    publicacao.setPeptideo(this);
  }

  public void removePublicacao(Publicacao publicacao) {
    this.publicacao.remove(publicacao);
    publicacao.setPeptideo(null);
  }

  public Set<String> getFuncaoBiologica() {
    return funcaoBiologica;
  }

  public void setFuncaoBiologica(Set<String> funcaoBiologica) {
    this.funcaoBiologica = funcaoBiologica;
  }

  public Set<String> getAtividadeAntibacteriana() {
    return atividadeAntibacteriana;
  }

  public void setAtividadeAntibacteriana(Set<String> atividadeAntibacteriana) {
    this.atividadeAntibacteriana = atividadeAntibacteriana;
  }

  public Set<String> getAtividadeAntifungica() {
    return atividadeAntifungica;
  }

  public void setAtividadeAntifungica(Set<String> atividadeAntifungica) {
    this.atividadeAntifungica = atividadeAntifungica;
  }

  public Set<String> getAtividadeCitotoxica() {
    return atividadeCitotoxica;
  }

  public void setAtividadeCitotoxica(Set<String> atividadeCitotoxica) {
    this.atividadeCitotoxica = atividadeCitotoxica;
  }

  public Set<String> getCasoSucesso() {
    return casoSucesso;
  }

  public void setCasoSucesso(Set<String> casoSucesso) {
    this.casoSucesso = casoSucesso;
  }

  public Set<String> getCaracteristicasAdicionais() {
    return caracteristicasAdicionais;
  }

  public void setCaracteristicasAdicionais(
    Set<String> caracteristicasAdicionais
  ) {
    this.caracteristicasAdicionais = caracteristicasAdicionais;
  }
}
