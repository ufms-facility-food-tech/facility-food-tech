package com.facility.dto;

import com.facility.model.Peptideo;
import com.facility.model.Publicacao;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public record PeptideoDTO(
  Long id,
  String nomeIdentificador,
  String sequencia,
  Boolean sintetizado,
  Boolean resultadoInterno,
  Integer quantidadeAminoacidos,
  Double massaMolecular,
  Double massaMolar,
  List<String> funcaoBiologica,
  List<String> microbiologia,
  List<String> atividadeAntifungica,
  List<String> atividadeCelular,
  List<String> propriedadesFisicoQuimicas,
  List<String> casoSucesso,
  List<String> caracteristicasAdicionais,
  List<Publicacao> publicacao,
  OrganismoDTO organismo
) {
  public static PeptideoDTO fromEntity(Peptideo peptideo) {
    List<String> entityFuncaoBiologica = null;
    List<String> entityMicrobiologia = null;
    List<String> entityAtividadeAntifungica = null;
    List<String> entityAtividadeCelular = null;
    List<String> entityPropriedadesFisicoQuimicas = null;
    List<String> entityCasoSucesso = null;
    List<String> entityCaracteristicasAdicionais = null;
    List<Publicacao> entityPublicacao = null;
    OrganismoDTO entityOrganismo = null;

    if (peptideo.getFuncaoBiologica() != null) {
      entityFuncaoBiologica = peptideo
        .getFuncaoBiologica()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getMicrobiologia() != null) {
      entityMicrobiologia = peptideo
        .getMicrobiologia()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtividadeAntifungica() != null) {
      entityAtividadeAntifungica = peptideo
        .getAtividadeAntifungica()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtividadeCelular() != null) {
      entityAtividadeCelular = peptideo
        .getAtividadeCelular()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getPropriedadesFisicoQuimicas() != null) {
      entityPropriedadesFisicoQuimicas = peptideo
        .getPropriedadesFisicoQuimicas()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getCasoSucesso() != null) {
      entityCasoSucesso = peptideo
        .getCasoSucesso()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getCaracteristicasAdicionais() != null) {
      entityCaracteristicasAdicionais = peptideo
        .getCaracteristicasAdicionais()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getPublicacao() != null) {
      entityPublicacao = peptideo
        .getPublicacao()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getOrganismo() != null) {
      entityOrganismo = OrganismoDTO.fromEntity(peptideo.getOrganismo());
    }

    return new PeptideoDTO(
      peptideo.getId(),
      peptideo.getNomeIdentificador(),
      peptideo.getSequencia(),
      peptideo.getSintetizado(),
      peptideo.getResultadoInterno(),
      peptideo.getQuantidadeAminoacidos(),
      peptideo.getMassaMolecular(),
      peptideo.getMassaMolar(),
      entityFuncaoBiologica,
      entityMicrobiologia,
      entityAtividadeAntifungica,
      entityAtividadeCelular,
      entityPropriedadesFisicoQuimicas,
      entityCasoSucesso,
      entityCaracteristicasAdicionais,
      entityPublicacao,
      entityOrganismo
    );
  }

  public Peptideo toEntity() {
    Peptideo peptideoEntity = new Peptideo();
    peptideoEntity.setId(id());
    peptideoEntity.setNomeIdentificador(nomeIdentificador());
    peptideoEntity.setSequencia(sequencia());
    peptideoEntity.setSintetizado(sintetizado());
    peptideoEntity.setResultadoInterno(resultadoInterno());
    peptideoEntity.setQuantidadeAminoacidos(quantidadeAminoacidos());
    peptideoEntity.setMassaMolecular(massaMolecular());
    peptideoEntity.setMassaMolar(massaMolar());
    peptideoEntity.setFuncaoBiologica(new HashSet<>(funcaoBiologica()));
    peptideoEntity.setMicrobiologia(new HashSet<>(microbiologia()));
    peptideoEntity.setAtividadeAntifungica(
      new HashSet<>(atividadeAntifungica())
    );
    peptideoEntity.setAtividadeCelular(new HashSet<>(atividadeCelular()));
    peptideoEntity.setPropriedadesFisicoQuimicas(
      new HashSet<>(propriedadesFisicoQuimicas())
    );
    peptideoEntity.setCasoSucesso(new HashSet<>(casoSucesso()));
    peptideoEntity.setCaracteristicasAdicionais(
      new HashSet<>(caracteristicasAdicionais())
    );
    if (publicacao() != null) {
      for (Publicacao pub : publicacao()) {
        peptideoEntity.addPublicacao(pub);
      }
    }
    return peptideoEntity;
  }
}
