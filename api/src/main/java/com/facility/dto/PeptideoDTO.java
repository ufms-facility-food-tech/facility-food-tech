package com.facility.dto;

import com.facility.enums.TipoPeptideo;
import com.facility.model.AtivAntibacteriana;
import com.facility.model.AtivAntifungica;
import com.facility.model.AtivCitotoxica;
import com.facility.model.CaracterisAdicionais;
import com.facility.model.CasoSucesso;
import com.facility.model.FuncBiologica;
import com.facility.model.Peptideo;
import com.facility.model.Publicacao;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class PeptideoDTO {

  private Long id;
  private String peptideo;
  private Integer quantidadeAminoacidos;
  private TipoPeptideo tipoPeptideo;
  private String sequencia;
  private String estruturaTridimensional;
  private Double massaMolecular;
  private Double impedimentoEsterico;
  private Double hidrofobicidade;
  private Double hidrofibocidade;
  private Double pontoIsoeletrico;
  private Double hidropatia;
  private Double anfipaticidade;
  private Double hidrofilicidade;
  private Integer cargaLiquidaTotal;
  private Double indiceBoman;
  private String descricao;
  List<FuncBiologicaDTO> funcBiologicas;
  List<AtivAntibacterianaDTO> ativAntibacterianas;
  List<AtivAntifungicaDTO> ativAntifungicas;
  List<AtivCitotoxicaDTO> ativCitotoxicas;
  List<CasoSucessoDTO> casosSucesso;
  List<CaracterisAdicionaisDTO> caracterisAdicionais;
  List<PublicacaoDTO> publicacoes;

  public PeptideoDTO(Peptideo peptideo) {
    this.id = peptideo.getId();
    this.peptideo = peptideo.getPeptideo();
    this.quantidadeAminoacidos = peptideo.getQuantidadeAminoacidos();
    this.tipoPeptideo = peptideo.getTipoPeptideo();
    this.sequencia = peptideo.getSequencia();
    this.estruturaTridimensional = peptideo.getEstruturaTridimensional();
    this.massaMolecular = peptideo.getMassaMolecular();
    this.impedimentoEsterico = peptideo.getImpedimentoEsterico();
    this.hidrofobicidade = peptideo.getHidrofobicidade();
    this.hidrofibocidade = peptideo.getHidrofobicidade();
    this.pontoIsoeletrico = peptideo.getPontoIsoeletrico();
    this.hidropatia = peptideo.getHidropatia();
    this.anfipaticidade = peptideo.getAnfipaticidade();
    this.hidrofilicidade = peptideo.getHidrofilicidade();
    this.cargaLiquidaTotal = peptideo.getCargaLiquidaTotal();
    this.indiceBoman = peptideo.getIndiceBoman();
    this.descricao = peptideo.getDescricao();
    if (peptideo.getFuncBiologicas() != null) {
      this.funcBiologicas = peptideo
        .getFuncBiologicas()
        .stream()
        .map(FuncBiologicaDTO::new)
        .collect(Collectors.toList());
    }
    if (peptideo.getAtivAntibacterianas() != null) {
      this.ativAntibacterianas = peptideo
        .getAtivAntibacterianas()
        .stream()
        .map(AtivAntibacterianaDTO::new)
        .collect(Collectors.toList());
    }
    if (peptideo.getAtivAntifungicas() != null) {
      this.ativAntifungicas = peptideo
        .getAtivAntifungicas()
        .stream()
        .map(AtivAntifungicaDTO::new)
        .collect(Collectors.toList());
    }
    if (peptideo.getAtivCitotoxicas() != null) {
      this.ativCitotoxicas = peptideo
        .getAtivCitotoxicas()
        .stream()
        .map(AtivCitotoxicaDTO::new)
        .collect(Collectors.toList());
    }
    if (peptideo.getCasosSucesso() != null) {
      this.casosSucesso = peptideo
        .getCasosSucesso()
        .stream()
        .map(CasoSucessoDTO::new)
        .collect(Collectors.toList());
    }
    if (peptideo.getCaracterisAdicionais() != null) {
      this.caracterisAdicionais = peptideo
        .getCaracterisAdicionais()
        .stream()
        .map(CaracterisAdicionaisDTO::new)
        .collect(Collectors.toList());
    }
    if (peptideo.getPublicacoes() != null) {
      this.publicacoes = peptideo
        .getPublicacoes()
        .stream()
        .map(PublicacaoDTO::new)
        .collect(Collectors.toList());
    }
  }

  public PeptideoDTO() {}

  public Peptideo toEntity() {
    Peptideo peptideoEntity = new Peptideo();
    peptideoEntity.setId(this.getId());
    peptideoEntity.setPeptideo(this.getPeptideo());
    peptideoEntity.setQuantidadeAminoacidos(this.getQuantidadeAminoacidos());
    peptideoEntity.setTipoPeptideo(this.getTipoPeptideo());
    peptideoEntity.setSequencia(this.getSequencia());
    peptideoEntity.setEstruturaTridimensional(
      this.getEstruturaTridimensional()
    );
    peptideoEntity.setMassaMolecular(this.getMassaMolecular());
    peptideoEntity.setImpedimentoEsterico(this.getImpedimentoEsterico());
    peptideoEntity.setHidrofobicidade(this.getHidrofobicidade());
    peptideoEntity.setPontoIsoeletrico(this.getPontoIsoeletrico());
    peptideoEntity.setHidropatia(this.getHidropatia());
    peptideoEntity.setAnfipaticidade(this.getAnfipaticidade());
    peptideoEntity.setHidrofilicidade(this.getHidrofilicidade());
    peptideoEntity.setCargaLiquidaTotal(this.getCargaLiquidaTotal());
    peptideoEntity.setIndiceBoman(this.getIndiceBoman());
    peptideoEntity.setDescricao(this.getDescricao());

    Set<FuncBiologica> funcBiologicasEntity = new HashSet<>();
    if (this.getFuncBiologicas() != null) {
      for (FuncBiologicaDTO funcBiologicaDTO : this.getFuncBiologicas()) {
        FuncBiologica funcBiologica = new FuncBiologica();
        funcBiologica.setId(funcBiologicaDTO.getId());
        funcBiologica.setDescricao(funcBiologicaDTO.getDescricao());
        funcBiologica.setPeptideo(peptideoEntity);
        funcBiologicasEntity.add(funcBiologica);
      }
    }
    peptideoEntity.setFuncBiologicas(funcBiologicasEntity);

    Set<AtivAntibacteriana> ativAntibacterianasEntity = new HashSet<>();
    if (this.getAtivAntibacterianas() != null) {
      for (AtivAntibacterianaDTO ativAntibacterianaDTO : this.getAtivAntibacterianas()) {
        AtivAntibacteriana ativAntibacteriana = new AtivAntibacteriana();
        ativAntibacteriana.setId(ativAntibacterianaDTO.getId());
        ativAntibacteriana.setDescricao(ativAntibacterianaDTO.getDescricao());
        ativAntibacteriana.setPeptideo(peptideoEntity);
        ativAntibacterianasEntity.add(ativAntibacteriana);
      }
    }
    peptideoEntity.setAtivAntibacterianas(ativAntibacterianasEntity);

    Set<AtivAntifungica> ativAntifungicasEntity = new HashSet<>();
    if (this.getAtivAntifungicas() != null) {
      for (AtivAntifungicaDTO ativAntifungicaDTO : this.getAtivAntifungicas()) {
        AtivAntifungica ativAntifungica = new AtivAntifungica();
        ativAntifungica.setId(ativAntifungicaDTO.getId());
        ativAntifungica.setDescricao(ativAntifungicaDTO.getDescricao());
        ativAntifungica.setPeptideo(peptideoEntity);
        ativAntifungicasEntity.add(ativAntifungica);
      }
    }
    peptideoEntity.setAtivAntifungicas(ativAntifungicasEntity);

    Set<AtivCitotoxica> ativCitotoxicasEntity = new HashSet<>();
    if (this.getAtivCitotoxicas() != null) {
      for (AtivCitotoxicaDTO ativCitotoxicaDTO : this.getAtivCitotoxicas()) {
        AtivCitotoxica ativCitotoxica = new AtivCitotoxica();
        ativCitotoxica.setId(ativCitotoxicaDTO.getId());
        ativCitotoxica.setDescricao(ativCitotoxicaDTO.getDescricao());
        ativCitotoxica.setPeptideo(peptideoEntity);
        ativCitotoxicasEntity.add(ativCitotoxica);
      }
    }
    peptideoEntity.setAtivCitotoxicas(ativCitotoxicasEntity);

    Set<CasoSucesso> casosSucessoEntity = new HashSet<>();
    if (this.getCasosSucesso() != null) {
      for (CasoSucessoDTO casoSucessoDTO : this.getCasosSucesso()) {
        CasoSucesso casoSucesso = new CasoSucesso();
        casoSucesso.setId(casoSucessoDTO.getId());
        casoSucesso.setCaso(casoSucessoDTO.getCaso());
        casoSucesso.setPeptideo(peptideoEntity);
        casosSucessoEntity.add(casoSucesso);
      }
    }
    peptideoEntity.setCasosSucesso(casosSucessoEntity);

    Set<CaracterisAdicionais> caracterisAdicionaisEntity = new HashSet<>();
    if (this.getCaracterisAdicionais() != null) {
      for (CaracterisAdicionaisDTO caracterisAdicionaisDTO : this.getCaracterisAdicionais()) {
        CaracterisAdicionais caracterisAdicional = new CaracterisAdicionais();
        caracterisAdicional.setId(caracterisAdicionaisDTO.getId());
        caracterisAdicional.setDescricao(
          caracterisAdicionaisDTO.getDescricao()
        );
        caracterisAdicional.setPeptideo(peptideoEntity);
        caracterisAdicionaisEntity.add(caracterisAdicional);
      }
    }
    peptideoEntity.setCaracterisAdicionais(caracterisAdicionaisEntity);

    Set<Publicacao> publicacoesEntity = new HashSet<>();
    if (this.getPublicacoes() != null) {
      for (PublicacaoDTO publicacaoDTO : this.getPublicacoes()) {
        Publicacao publicacao = new Publicacao();
        publicacao.setId(publicacaoDTO.getId());
        publicacao.setUrl(publicacaoDTO.getUrl());
        publicacao.setPeptideo(peptideoEntity);
        publicacoesEntity.add(publicacao);
      }
    }
    peptideoEntity.setPublicacoes(publicacoesEntity);

    return peptideoEntity;
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

  public List<FuncBiologicaDTO> getFuncBiologicas() {
    return funcBiologicas;
  }

  public void setFuncBiologicas(List<FuncBiologicaDTO> funcBiologicas) {
    this.funcBiologicas = funcBiologicas;
  }

  public List<AtivAntibacterianaDTO> getAtivAntibacterianas() {
    return ativAntibacterianas;
  }

  public void setAtivAntibacterianas(
    List<AtivAntibacterianaDTO> ativAntibacterianas
  ) {
    this.ativAntibacterianas = ativAntibacterianas;
  }

  public List<AtivAntifungicaDTO> getAtivAntifungicas() {
    return ativAntifungicas;
  }

  public void setAtivAntifungicas(List<AtivAntifungicaDTO> ativAntifungicas) {
    this.ativAntifungicas = ativAntifungicas;
  }

  public List<AtivCitotoxicaDTO> getAtivCitotoxicas() {
    return ativCitotoxicas;
  }

  public void setAtivCitotoxicas(List<AtivCitotoxicaDTO> ativCitotoxicas) {
    this.ativCitotoxicas = ativCitotoxicas;
  }

  public List<CasoSucessoDTO> getCasosSucesso() {
    return casosSucesso;
  }

  public void setCasosSucesso(List<CasoSucessoDTO> casosSucesso) {
    this.casosSucesso = casosSucesso;
  }

  public List<CaracterisAdicionaisDTO> getCaracterisAdicionais() {
    return caracterisAdicionais;
  }

  public void setCaracterisAdicionais(
    List<CaracterisAdicionaisDTO> caracterisAdicionais
  ) {
    this.caracterisAdicionais = caracterisAdicionais;
  }

  public List<PublicacaoDTO> getPublicacoes() {
    return publicacoes;
  }

  public void setPublicacoes(List<PublicacaoDTO> publicacoes) {
    this.publicacoes = publicacoes;
  }

  public Double getHidrofobicidade() {
    return hidrofobicidade;
  }

  public void setHidrofobicidade(Double hidrofobicidade) {
    this.hidrofobicidade = hidrofobicidade;
  }
}
