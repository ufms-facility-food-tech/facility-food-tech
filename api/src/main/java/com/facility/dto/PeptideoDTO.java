package com.facility.dto;

import com.facility.enums.TipoPeptideo;
import com.facility.model.Organismo;
import com.facility.model.Peptideo;

public class PeptideoDTO {

  private Long id;
  private String peptideo;
  private Integer quantidadeAminoacidos;
  private TipoPeptideo tipoPeptideo;
  private String sequencia;
  private String estruturaTridimensional;
  private Double massaMolecular;
  private Double impedimentoEsterico;
  private Double hidrofibocidade;
  private Double pontoIsoeletrico;
  private Double hidropatia;
  private Double anfipaticidade;
  private Double hidrofilicidade;
  private Integer cargaLiquidaTotal;
  private Double indiceBoman;
  private String descricao;
  private Organismo organismo;

  public PeptideoDTO(Peptideo peptideo) {
    this.id = peptideo.getId();
    this.peptideo = peptideo.getPeptideo();
    this.quantidadeAminoacidos = peptideo.getQuantidadeAminoacidos();
    this.tipoPeptideo = peptideo.getTipoPeptideo();
    this.sequencia = peptideo.getSequencia();
    this.estruturaTridimensional = peptideo.getEstruturaTridimensional();
    this.massaMolecular = peptideo.getMassaMolecular();
    this.impedimentoEsterico = peptideo.getImpedimentoEsterico();
    this.hidrofibocidade = peptideo.getHidrofobicidade();
    this.pontoIsoeletrico = peptideo.getPontoIsoeletrico();
    this.hidropatia = peptideo.getHidropatia();
    this.anfipaticidade = peptideo.getAnfipaticidade();
    this.hidrofilicidade = peptideo.getHidrofilicidade();
    this.cargaLiquidaTotal = peptideo.getCargaLiquidaTotal();
    this.indiceBoman = peptideo.getIndiceBoman();
    this.descricao = peptideo.getDescricao();
    this.organismo = peptideo.getOrganismo();
  }

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

  public Integer getQuantidadeAminoacidos() {
    return quantidadeAminoacidos;
  }

  public void setQuantidadeAminoacidos(Integer quantidadeAminoacidos) {
    this.quantidadeAminoacidos = quantidadeAminoacidos;
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

  public Double getImpedimentoEsterico() {
    return impedimentoEsterico;
  }

  public void setImpedimentoEsterico(Double impedimentoEsterico) {
    this.impedimentoEsterico = impedimentoEsterico;
  }

  public Double getHidrofibocidade() {
    return hidrofibocidade;
  }

  public void setHidrofibocidade(Double hidrofibocidade) {
    this.hidrofibocidade = hidrofibocidade;
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

  public Integer getCargaLiquidaTotal() {
    return cargaLiquidaTotal;
  }

  public void setCargaLiquidaTotal(Integer cargaLiquidaTotal) {
    this.cargaLiquidaTotal = cargaLiquidaTotal;
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

  public Organismo getOrganismo() {
    return organismo;
  }

  public void setOrganismo(Organismo organismo) {
    this.organismo = organismo;
  }
}
