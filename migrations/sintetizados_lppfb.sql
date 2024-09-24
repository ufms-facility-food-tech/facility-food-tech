-- Create temporary tables to hold our data
CREATE TEMPORARY TABLE temp_organismo (
    nome_cientifico TEXT,
    familia TEXT,
    origem TEXT
);

CREATE TEMPORARY TABLE temp_nome_popular (
    nome_cientifico TEXT,
    nome TEXT
);

CREATE TEMPORARY TABLE temp_peptideo (
    nome_cientifico TEXT,
    sintetico BOOLEAN,
    sequencia TEXT,
    identificador TEXT,
    microbiologia TEXT,
    atividade_antifungica TEXT,
    ensaio_celular TEXT,
    massa_molecular NUMERIC,
    massa_molar NUMERIC,
    propriedades_fisico_quimicas TEXT
);

CREATE TEMPORARY TABLE temp_funcao_biologica (
    identificador TEXT,
    "value" TEXT
);


-- Insert literal values into temp_organismo
INSERT INTO temp_organismo (nome_cientifico, familia, origem) VALUES
('Inga laurina', 'Leguminosae', 'ILIT'),
('Adenanthera pavonina', 'Fabaceae (Leguminosae)', 'ApTI'),
('Spodoptera frugiperda', 'Noctuidae', 'Spodoptera frugiperda');


-- Insert literal values into temp_nome_popular
INSERT INTO temp_nome_popular (nome_cientifico, nome) VALUES
('Inga laurina', 'Inga'),
('Adenanthera pavonina', 'Acácia-branca'),
('Adenanthera pavonina', 'Árvore-da-coral'),
('Adenanthera pavonina', 'Saga'),
('Spodoptera frugiperda', 'Lagarta-do-cartucho');


-- Insert literal values into temp_peptideo
INSERT INTO temp_peptideo (
    nome_cientifico,
    sintetico,
    sequencia,
    identificador,
    microbiologia,
    atividade_antifungica,
    ensaio_celular,
    massa_molecular,
    massa_molar,
    propriedades_fisico_quimicas
) VALUES
('Inga laurina', false, 'KWIRRIIRDYKKFFIKFII-COOH', 'KWI-19', '**Bactérias Gram-negativas:**
- *Klebsiella pneumoniae 13883:*
- KWI-19: MIC 5.0 µmol L⁻¹, MBC 5.0 µmol L⁻¹
- Ciprofloxacino: MIC 0.0625 µmol L⁻¹, MBC 0.0625 µmol L⁻¹
- *Klebsiella aerogenes 13048:*
- KWI-19: MIC 2.5 µmol L⁻¹, MBC 2.5 µmol L⁻¹
- Ciprofloxacino: MIC 0.0625 µmol L⁻¹, MBC 0.125 µmol L⁻¹

- *Escherichia coli 35218:*
- KWI-19: MIC 1.25 µmol L⁻¹, MBC 2.5 µmol L⁻¹
- Ciprofloxacino: MIC < 0.0156 µmol L⁻¹, MBC 0.125 µmol L⁻¹

- *Pseudomonas aeruginosa 27853:*
- KWI-19: MIC 1.25 µmol L⁻¹, MBC 2.5 µmol L⁻¹
- Ciprofloxacino: MIC 0.5 µmol L⁻¹, MBC 1.0 µmol L⁻¹

- *Klebsiella oxytoca 13182:*
- KWI-19: MIC 2.5 µmol L⁻¹, MBC 2.5 µmol L⁻¹
- Ciprofloxacino: MIC 0.0625 µmol L⁻¹, MBC 0.0625 µmol L⁻¹

- *Salmonella enterica 51741:*
- KWI-19: MIC 1.25 µmol L⁻¹, MBC 1.25 µmol L⁻¹
- Ciprofloxacino: MIC 0.0625 µmol L⁻¹, MBC 0.0625 µmol L⁻¹

- *Enterobacter cloacae 13047:*
- KWI-19: MIC 2.5 µmol L⁻¹, MBC 2.5 µmol L⁻¹
- Ciprofloxacino: MIC 0.0625 µmol L⁻¹, MBC 0.125 µmol L⁻¹

- *Acinetobacter baumani 19606:*
- KWI-19: MIC 2.5 µmol L⁻¹, MBC 5.0 µmol L⁻¹
- Ciprofloxacino: MIC 1.0 µmol L⁻¹, MBC 8.0 µmol L⁻¹

- *Proteus mirabilis 12453:*
- KWI-19: MIC > 10.0 µmol L⁻¹, MBC > 10.0 µmol L⁻¹
- Ciprofloxacino: MIC 4.0 µmol L⁻¹, MBC 8.0 µmol L⁻¹

- *Serratia marcescens 13880:*
- KWI-19: MIC > 10.0 µmol L⁻¹, MBC > 10.0 µmol L⁻¹
- Ciprofloxacino: MIC 0.5 µmol L⁻¹, MBC 4.0 µmol L⁻¹

**Bactérias Gram-positivas:**
- *Staphylococcus saprophyticus 49453:*
- KWI-19: MIC 1.25 µmol L⁻¹, MBC 2.5 µmol L⁻¹
- Vancomicina: MIC 0.68 µmol L⁻¹, MBC 0.68 µmol L⁻¹

- *Staphylococcus epidermidis 12228:*
- KWI-19: MIC 2.5 µmol L⁻¹, MBC 2.5 µmol L⁻¹
- Vancomicina: MIC 1.36 µmol L⁻¹, MBC 1.36 µmol L⁻¹

- *Staphylococcus aureus 29213:*
- KWI-19: MIC 5.0 µmol L⁻¹, MBC 5.0 µmol L⁻¹
- Vancomicina: MIC 0.68 µmol L⁻¹, MBC 0.68 µmol L⁻¹
- *Staphylococcus haemolyticus 29970:*
- KWI-19: MIC > 10.0 µmol L⁻¹, MBC > 10.0 µmol L⁻¹
- Vancomicina: MIC > 43.5 µmol L⁻¹, MBC -

- *MRSA 43300:*
- KWI-19: MIC 5.0 µmol L⁻¹, MBC 5.0 µmol L⁻¹
- Vancomicina: MIC > 43.5 µmol L⁻¹, MBC -
', 'Os resultados da determinação das concentrações inibitórias mínimas (MICs), concentração fungicida mínima (MFC) e MIC na presença de 0.8 mol L⁻¹ de sorbitol e 1.01 mmol L⁻¹ de ergosterol para o peptídeo KWI-19 contra leveduras Candida são apresentados na Tabela 3.

**Candida albicans 90028:**
- KWI-19: MIC 5.0 μmol L⁻¹, MFC 10 μmol L⁻¹
- Anfotericina B: MIC 0.135 μmol L⁻¹, MFC 1.08 μmol L⁻¹
- Sorbitol: 5.0 μmol L⁻¹
- Ergosterol: >20.0 μmol L⁻¹

**Candida glabrata 90030:**
- KWI-19: MIC >20.0 μmol L⁻¹, MFC >20.0 μmol L⁻¹
- Anfotericina B: MIC 0.135 μmol L⁻¹, MFC 0.54 μmol L⁻¹
- Sorbitol: Não aplicável
- Ergosterol: Não aplicável

**Candida krusei 6258:**
- KWI-19: MIC 20.0 μmol L⁻¹, MFC >20.0 μmol L⁻¹
- Anfotericina B: MIC 0.27 μmol L⁻¹, MFC 0.54 μmol L⁻¹
- Sorbitol: 20.0 μmol L⁻¹
- Ergosterol: >20.0 μmol L⁻¹

**Candida parapsilosis 2209:**
- KWI-19: MIC 10.0 μmol L⁻¹, MFC 20.0 μmol L⁻¹
- Anfotericina B: MIC 0.27 μmol L⁻¹, MFC 0.54 μmol L⁻¹
- Sorbitol: 10.0 μmol L⁻¹
- Ergosterol: >20.0 μmol L⁻¹

**Candida tropicalis 750:**
- KWI-19: MIC 5.0 μmol L⁻¹, MFC 5.0 μmol L⁻¹
- Anfotericina B: MIC 0.54 μmol L⁻¹, MFC 0.54 μmol L⁻¹
- Sorbitol: 5.0 μmol L⁻¹
- Ergosterol: 20.0 μmol L⁻¹

**Candida guillermondii 6260:**
- KWI-19: MIC 2.5 μmol L⁻¹, MFC 2.5 μmol L⁻¹
- Anfotericina B: MIC 0.067 μmol L⁻¹, MFC 0.135 μmol L⁻¹
- Sorbitol: 2.5 μmol L⁻¹
- Ergosterol: >20.0 μmol L⁻¹', '                                                                                                                        Hemólise (HC50): 6.5 µmol L-1
Viabilidade Celular (IC50 - RAW 264.7 cells): 64 µmol L-1
Toxicidade Aguda em Larvas de G. mellonella: Não tóxico em concentrações até 50 µmol L-1
IC50 do KWI-19 para B16F10-Nex2: 22.14 μmol L⁻¹.
IC50 para células macrofágicas murinas (RAW 264.7): 48.82 μmol L⁻¹.
', NULL, 2113.44, 'Inibidor de serina, especificamente do tipo Kunitz.
Inibidores de tripsina (IPs). Peptídeo KWI-19:
Carga Líquida Total: +6
Índice de Boman: 1.85 Kcal mol-1
Ponto Isoelétrico: 11.80
Relação Hidrofóbica: 52.00%'),
('Inga laurina', false, 'IKRQYKRFFKLFKWFLKK', 'IKR18', '
**Gram-negativa:**
1. Enterobacter aerogenes ATCC 13048 - CIM: 1 µM, CBM: 1 µM, IS: 25.00
2. Acinetobacter baumannii ATCC 19606 - CIM: 1 µM, CBM: 1 µM, IS: 25.00
3. Escherichia coli ATCC 35218 - CIM: 1 µM, CBM: 2 µM, IS: 25.00
4. Klebsiella pneumoniae ATCC 700603 - CIM: 1 µM, CBM: 2 µM, IS: 25.00
5. Enterobacter cloacae ATCC 13047 - CIM: 3 µM, CBM: 3 µM, IS: 8.33
6. Klebsiella oxytoca ATCC 13182 - CIM: 4 µM, CBM: 4 µM, IS: 6.25
7. Serratia marcescens ATCC 13880 - CIM: 4 µM, CBM: 4 µM, IS: 6.25
8. Proteus mirabilis ATCC 12453 - CIM: 4 µM, CBM: 4 µM, IS: 6.25

**Gram-positiva:**
1. Staphylococcus aureus (MSSA) ATCC 29213 - CIM: 1 µM, CBM: 1 µM, IS: 25.00
2. Staphylococcus saprophyticus ATCC 29970 - CIM: 1 µM, CBM: 1 µM, IS: 25.00
3. Staphylococcus aureus (MRSA) ATCC 43300 - CIM: 2 µM, CBM: 2 µM, IS: 12.50
4. Staphylococcus haemolyticus ATCC 49453 - CIM: 3 µM, CBM: 3 µM, IS: 8.33
5. Staphylococcus epidermidis ATCC 35984 - CIM: 4 µM, CBM: 4 µM, IS: 6.25                                                    ', NULL, 'Em larvas de G. mellonella nas concentrações de IKR18 (400-1 µM) não mostraram sinais de toxicidade até 72 horas.                                                                                                                IC50 DMSO: 100% de morte das larvas', NULL, 2505.14, 'Carga líquida : +8                                                                         índice de Boman de 2,21 kcal.mol-1
Relação Hidrofóbica: 44.00%'),
('Inga laurina', false, 'KWIRRIIRDYKKFFIKFI', 'KWI18', 'Gram-positive bacteria

Staphylococcus aureus ATCC 35983: MIC (2 μM), MBC (2 μM), MBC/MIC ratio (1)
Staphylococcus aureus ATCC 33591 (MR): MIC (2 μM), MBC (2 μM), MBC/MIC ratio (1)
Staphylococcus epidermidis ATCC 12228: MIC (1 μM), MBC (8 μM), MBC/MIC ratio (8)
Staphylococcus saprophyticus ATCC 29970: MIC (1 μM), MBC (4 μM), MBC/MIC ratio (4)
Gram-negative bacteria

Escherichia coli ATCC 35218: MIC (2 μM), MBC (>8 μM), MBC/MIC ratio (NA)
Enterobacter cloacae ATCC 13047: MIC (2 μM), MBC (2 μM), MBC/MIC ratio (1)
Klebsiella pneumoniae ATCC 700603: MIC (2 μM), MBC (>8 μM), MBC/MIC ratio (NA)
Pseudomonas aeruginosa ATCC 9027: MIC (0.5 μM), MBC (0.5 μM), MBC/MIC ratio (1)
Acinetobacter baumannii ATCC 19606: MIC (2 μM), MBC (2 μM), MBC/MIC ratio (1)
Salmonella enterica ATCC 51741: MIC (1 μM), MBC (>8 μM), MBC/MIC ratio (NA)
Enterobacter aerogenes ATCC 13048: MIC (2 μM), MBC (2 μM), MBC/MIC ratio (1)', 'Candida albicans SC 5314: MIC (10 μM), MFC (10 μM), MFC/MIC ratio (1)
Candida krusei ATCC 6258: MIC (10 μM), MFC (>10 μM), MFC/MIC ratio (NA)
Candida glabrata ATCC 90030: MIC (>10 μM), MFC (>10 μM), MFC/MIC ratio (NA)
Candida parapsilosis ATCC 22019: MIC (5 μM), MFC (10 μM), MFC/MIC ratio (2)', 'Toxicidade Aguda em Larvas de Galleria mellonella: KWI18 não demonstrou toxicidade aguda em larvas de Galleria mellonella durante 72 horas, mantendo 100% de viabilidade, enquanto o DMSO causou mortalidade completa em 40 horas. Ceftriaxona (droga de controle) não causou morte das larvas.

Hemólise de Eritrócitos: Na sua MIC, KWI18 causou menos de 5% de hemólise de eritrócitos, e na concentração de 407,3 μM, a hemólise não excedeu 30%, indicando baixa toxicidade.', NULL, 2471.08, '
Carga líquida total: +6
Índice de Boman: 2,21 kcal/mol
Hidrofobicidade total: 50%
Ponto isoelétrico: 11,12
Previsão de atividade antimicrobiana: 97%'),
('Adenanthera pavonina', false, 'FQRYFHRYARFLAKIWKG', 'Adepamicina', 'Gram-negative bacteria:

Escherichia coli: MIC 0.9 μM
Klebsiella pneumoniae: MIC 1.4 μM
Pseudomonas aeruginosa: MIC 2.8 μM
Klebsiella oxytoca: MIC 3.6 μM
Others (e.g., Salmonella enterica): MIC >10 μM
Gram-positive bacteria:

Staphylococcus aureus: MIC 1.8 μM
Others (e.g., Staphylococcus saprophyticus): MIC >10 μM', 'Candida albicans: IC50 5.2 μM
Candida tropicalis: IC50 41.6 μM', 'Hemólise dependente da dose: Baixa atividade de 1,3 a 10,4 μM (<10% de hemólise)
Concentrações mais altas: >20% de hemólise, atingindo 60% na maior concentração', NULL, 2384.82, 'Carga líquida total: +6
Índice de Boman: 2,25 kcal/mol
Hidrofobicidade total: 44%
Atividade antimicrobiana: 92,9%'),
('Adenanthera pavonina', false, 'RKYVRFLHRWVKYFRAYL', 'Adevonina', 'Bactérias Gram-negativas
Enterobacter aerogenes ATCC 13048         >14,79
Enterobacter cloacae ATCC 13047 >14,79
Escherichia coli ATCC 35218 7,35
Klebsiella oxytoca ATCC 13182 1,84
Klebsiella pneumoniae ATCC 70603 3,67
Salmonella enterica ATCC 51741 14,79
Serratia marcescens ATCC 13880 1,84
Bactérias Gram-positivas
Staphylococcus aureus ATCC 80958 7,35
Staphylococcus epidermidis ATCC 12228 >14,79
Staphylococcus haemolyticus ATCC 29970 14,79
Staphylococcus saprophyticus ATCC 49453 14,79
', NULL, 'Hemólise: 175 µM                                                                                                                         Redução da viabiliadade celular em células normais próximo de 20% (10 µM)', 2502.04, NULL, 'Carga líquida total:+6                                              Relação Hidrofóbica: 44%.'),
('Adenanthera pavonina', false, 'LTRWIRKICRCLKRYYRG', 'PEPAD', '**Bactérias Gram-positivas**
S. aureus(MRSA) ATCC 33591 - CIM: 8 µM, CBM: 8 µM
S. aureus (MRSA) ATCC 43300 - CIM: 10 µM, CBM: 10 µM
S. aureus ATCC 80958 - CIM: 10 µM, CBM: 10 µM
S. aureus ATCC 29213 - CIM: 10 µM, CBM: >10 µM
S. epidermidis ATCC 00197 - CIM: 4 µM, CBM: 4 µM
S. epidermidis ATCC 12228 - CIM: 6 µM, CBM: 6 µM
S. saprophyticus ATCC 49453 - CIM: 4 µM, CBM: 4 µM

**Bactérias Gram-negativas**
A. baumannii ATCC 19606 - CIM: 8 µM, CBM: 8 µM
E. coli ATCC 35218 - CIM: 6 µM, CBM: 6 µM
E. coli ATCC 43895 - CIM: 10 µM, CBM: 10 µM
K. pneumoniae ATCC 13883 - CIM: 10 µM, CBM: 10 µM
P. aeruginosa ATCC 27853 - CIM: 5 µM, CBM: 10 µM
S. enterica ATCC 51741 - CIM: 10 µM, CBM: 10 µM
', 'C. albicans ATCC 5314 - CIM: 20 µM, CFM: >20 µM
C. guilliermondii ATCC 6260 - CIM: 2,5 µM, CFM: 5 µM
C. krusei ATCC 6258 - CIM: 10 µM, CFM: 20 µM
C. tropicalis ATCC 750 - CIM: 5 µM, CFM: 5 µM
C. utilis ATCC 9950 - CIM: 2,5 µM, CFM: 5 µM
', 'Em larvas de G. mellonella nas concentrações de 5 µM e 50 µM não apresentou toxicidade
Hemólise: 1, 63 µM
Melanoma murino (B16F10-Nex2) - IC50: 7,4 µM
Leucócitos humanos (PBMC): nas concentrações testadas (2,5 µM a 160 µM) não apresentou toxicidade
Macrófago murino (RAW 264.7): nas concentrações testadas (0,25 µM a 16 µM) não apresentou toxicidade
Fibroblasto humano (FN1): nas concentrações testadas (0,25 µM a 16 µM) não apresentou toxicidade
', NULL, 2384.94, 'Carga Líquida Total: +7
Índice de Boman: 3,31 Kcal mol-1
Ponto Isoelétrico: 11,96
Relação Hidrofóbica: 38%                    '),
(NULL, true, 'RALRKALKAWRKLAKKLQ', 'RQ18', 'Gram-positivas:

S. aureus ATCC 25923: CIM 10 µM, CBM 12 µM
S. epidermidis ATCC 35984: CIM 4 µM, CBM 4 µM
S. saprophyticus ATCC 29970: CIM 2 µM, CBM 2 µM
S. haemolyticus ATCC 49453: CIM 2 µM, CBM 2 µM
Gram-negativas:

A. baumannii ATCC 19606: CIM 3 µM, CBM 5 µM
E. cloacae ATCC 13047: CIM >29,4 µM, CBM >29,4 µM
E. coli ATCC 35218: CIM 2 µM, CBM 5 µM
K. pneumoniae ATCC 700603: CIM 5 µM, CBM 5 µM                                                   Isolados clínicos:
Corynebacterium sp. – leite bovino: CIM = 2,5 µM, CBM = 20 µM
Escherichia coli – leite ovino: CIM = 1,25 µM, CBM = 1,25 µM
Salmonella sp. – sepse bovino: CIM = 5 µM, CBM = 40 µM
Staphylococcus aureus – leite bovino: CIM = 1,25 µM, CBM = 1,25 µM  E. coli – leite ovino: CIM = 1,25 µM, CFM/CBM = 20 µM (NaCl 150 mM), CFM/CBM = 20 µM (NaCl 300 mM)
S. aureus – leite bovino: CIM = 1,25 µM, CFM/CBM = 20 µM (NaCl 150 mM), CFM/CBM = 20 µM (NaCl 300 mM) E. coli: RQ18 (a) + ciprofloxacina (b): CIM individual = 1,25 µM (RQ18), CIM combinação = 0,15 µM, Σ ICIF = 0,009 µM (Sinérgico)
S. aureus: RQ18 (a) + ciprofloxacina (b): CIM individual = 1,25 µM (RQ18), CIM combinação = 0,31 µM, Σ ICIF = 0,0006 µM (Sinérgico)', 'Cryptococcus gattii AFLP4: CIM = 5 µM, CFM = 5 µM (Anfotericina B), CFM = 5 µM (Fluconazol)
Candida guilliermondii ATCC 6260: CIM = 2,5 µM, CFM = 5 µM (Anfotericina B), CFM = 26,12 µM (Fluconazol)
Candida tropicalis ATCC 750: CIM = 5 µM, CFM = 10 µM (Anfotericina B), CFM = 1,62 µM (Fluconazol)
Candida utilis ATCC 9950: CIM = 5 µM, CFM = 10 µM (Anfotericina B), CFM = 13,06 µM (Fluconazol)
Candida parapsilosis ATCC 22019: CIM = 10 µM, CFM = 15 µM (Anfotericina B), CFM = 6,53 µM (Fluconazol)
Candida albicans MYA 2876: CIM = 20 µM, CFM = 20 µM (Anfotericina B), CFM > 52 µM (Fluconazol)
Candida krusei ATCC 6258: CIM = 30 µM, CFM > 40 µM (Anfotericina B), CFM > 52 µM (Fluconazol)
Candida albicans ATCC 90028: CIM > 40 µM, CFM > 40 µM (Anfotericina B), CFM > 52 µM (Fluconazol)
Candida glabrata ATCC 1707: CIM > 40 µM, CFM > 40 µM (Anfotericina B), CFM > 52 µM (Fluconazol)
Candida glabrata ATCC 90030: CIM > 40 µM, CFM > 40 µM (Anfotericina B), CFM > 52 µM (Fluconazol)   C. tropicalis ATCC 750: CIM = 5 µM, CFM/CBM = 10 µM (NaCl 150 mM), CFM/CBM = 20 µM (NaCl 300 mM)
C. gattii AFLP4: CIM = 5 µM, CFM/CBM = 5 µM (NaCl 150 mM), CFM/CBM = 10 µM (NaCl 300 mM)  C. tropicalis: RQ18 (a) + anfotericina B (b): CIM individual = 5 µM (RQ18), CIM combinação = 0,54 µM, Σ ICIF = 0,03 µM (Sinérgico)
C. gattii: RQ18 (a) + anfotericina B (b): CIM individual = 5 µM (RQ18), CIM combinação = 1,08 µM, Σ ICIF = 0,008 µM (Sinérgico) ryptococcus gattii AFLP4: CIM = 5 µM (D-Sorbitol), CIM = 5 µM (Ergosterol)
Candida guilliermondii ATCC 6260: CIM = 2,5 µM (D-Sorbitol), CIM = 2,5 µM (Ergosterol)
Candida tropicalis ATCC 750: CIM = 5 µM (D-Sorbitol), CIM = 5 µM (Ergosterol)
Candida utilis ATCC 9950: CIM = 5 µM (D-Sorbitol), CIM = 5 µM (Ergosterol)
Candida parapsilosis ATCC 22019: CIM = 10 µM (D-Sorbitol), CIM = 10 µM (Ergosterol)
Candida albicans MYA 2876: CIM = 20 µM (D-Sorbitol), CIM = 20 µM (Ergosterol)
Candida krusei ATCC 6258: CIM = 30 µM (D-Sorbitol), CIM = 30 µM (Ergosterol)', 'IC50 para células saudáveis: 69,2 µM
IC50 para células bacterianas, fúngicas e cancerígenas: <6 µM
Concentrações testadas em larvas de Galleria mellonella: 5 µM, 50 µM, 100 µM, todas com 100% de sobrevivência em 72 horas
IC50 para células de melanoma murino B16F10-Nex2: 4,4 µM





', 2178.729, NULL, 'Carga líquida total: +8
Relação hidrofóbica (GRAVY): 0,833
Índice de Boman: 2,71 kcal/mol'),
(NULL, true, 'RKWRKWWK', 'RK8', 'Gram-negativas
E. coli ATCC 35218: 2 µM
K. pneumoniae ATCC 700603: >16 µM
P. aeruginosa ATCC 27853: 0,5 µM
A. baumannii ATCC 19906: 4 µM
Gram-positivas
S. saprophyticus ATCC 29970: 0,5 µM                                                                     Contra E. coli KPC+ IC 001812446: Bliss Sinergy Score de 3,99 (sinérgico)
Contra A. baumannii IC 003321216: Bliss Sinergy Score de -4,01 (antagonista)                                                                                                                   Biofilme de A. baumannii IC 003321216: Redução de 38% na CIM
Comparação com Ciprofloxacino: Sem diferença significativa', NULL, 'Concentração Máxima para Hemólise: 100 μM
Percentagem de Hemólise na Concentração Máxima: 4,6%
Viabilidade Celular em Macrófagos (64 μM, 24h): 90,1%', 1273.54, NULL, 'Carga líquida total +5
Índice de Boman (Kcal/mol) 4,93
Ponto Isoelétrico (pI) 12,51
Razão Hidrofóbica 38%'),
('Spodoptera frugiperda', false, 'ITRYLDKILRILRKYLKA', 'PEP-IA18', NULL, 'C. tropicalis ATCC 750

PEP-IA18: MIC 2.5 μM, MFC 5.0 μM
Amphotericin B: MIC 1.08 μM, MFC 2.16 μM
C. albicans MYA2876

PEP-IA18: MIC 2.5 μM, MFC 5.0 μM
Amphotericin B: MIC 1.08 μM, MFC 2.16 μM
Efeito de sorbitol (0.8 M) na atividade antifúngica do PEP-IA18:

C. albicans MYA 2876

PEP-IA18: MIC sem sorbitol 2.5 μM, MIC com sorbitol 2.5 μM
Caspofungin: MIC sem sorbitol 0.12 μM, MIC com sorbitol 15.6 μM
C. tropicalis ATCC 750

PEP-IA18: MIC sem sorbitol 2.5 μM, MIC com sorbitol 2.5 μM
Caspofungin: MIC sem sorbitol 0.06 μM, MIC com sorbitol 31.25 μM
Efeito de ergosterol exógeno (400 μg/ml) na atividade antifúngica do PEP-IA18:

C. albicans MYA 2876

PEP-IA18: MIC sem ergosterol 2.5 μM, MIC com ergosterol 20.0 μM
Amphotericin B: MIC sem ergosterol 1.0 μM, MIC com ergosterol 16.0 μM
C. tropicalis ATCC 750

PEP-IA18: MIC sem ergosterol 2.5 μM, MIC com ergosterol 20.0 μM
Amphotericin B: MIC sem ergosterol 1.0 μM, MIC com ergosterol 8.0 μM', 'Viabilidade de Células Fibroblásticas:

A viabilidade dos fibroblastos MRC-5 foi avaliada após exposição ao PEP-IA18 por 24 horas.
Apenas concentrações de PEP-IA18 superiores a 17.5 mM afetaram significativamente a viabilidade das células MRC-5 (Figura 5).
Atividade Hemolítica:

O PEP-IA18 não causou hemólise de eritrócitos humanos em concentrações abaixo de 225 mM, indicando que o peptídeo pode ser potencialmente seguro para uso terapêutico.', 2276.86, NULL, ' Hidrofobicidade: 44%
Carga Líquida (>30%): +5');


INSERT INTO temp_funcao_biologica (identificador, "value") VALUES
('KWI-19', 'Peptídeo antifúngico, atividade antibacteriana e antibiofilme, inseticida e anticâncer.'),
('IKR18', 'Atividade
antimicrobiana '),
('KWI18', 'Atividade
antimicrobiana e antibiofilme'),
('Adepamicina', 'Atividade, antibacteriana, antifungica e interfere na integridade da membrana'),
('Adevonina', 'Atividade
antimicrobiana '),
('PEPAD', 'Peptídeo com atividade antibacteriana, antifúngica e anticâncer'),
('RQ18', 'ANTIBACTERIANA, ANTIFÚNGICA E ANTICANCERÍGENA'),
('RK8', ' Antimicrobianas, especialmente no contexto de tratamento de infecções resistentes a antibióticos e na possível formulação de terapias combinadas.'),
('PEP-IA18', 'Atividade Antifúngica');

-- Now process the data
DO $$
DECLARE
    org_row RECORD;
    nome_popular_row RECORD;
    pep_row RECORD;
    func_bio_row RECORD;
    org_id INTEGER;
    pub_id INTEGER;
    nome_popular_id INTEGER;
    pep_id INTEGER;
    func_bio TEXT;
BEGIN
    -- First, insert all nome_popular
    FOR nome_popular_row IN SELECT * FROM temp_nome_popular LOOP
        INSERT INTO "nome_popular" ("nome")
        VALUES (nome_popular_row.nome)
        ON CONFLICT DO NOTHING;
    END LOOP;

    -- Then, insert all organisms
    FOR org_row IN SELECT * FROM temp_organismo LOOP
        INSERT INTO "organismo" ("nome_cientifico", "familia", "origem")
        VALUES (org_row.nome_cientifico, org_row.familia, org_row.origem)
        RETURNING id INTO org_id;

        -- Insert nome_popular for this organism
        FOR nome_popular_row IN SELECT nome FROM temp_nome_popular WHERE nome_cientifico = org_row.nome_cientifico LOOP
            SELECT id INTO nome_popular_id FROM "nome_popular" WHERE nome = nome_popular_row.nome;
            INSERT INTO "organismo_to_nome_popular" ("organismo_id", "nome_popular_id")
            VALUES (org_id, nome_popular_id);
        END LOOP;
    END LOOP;

    -- Now, process peptides
    FOR pep_row IN SELECT * FROM temp_peptideo LOOP
        -- Get the organismo_id
        IF pep_row.nome_cientifico IS NOT NULL THEN
            SELECT id INTO org_id FROM "organismo" WHERE nome_cientifico = pep_row.nome_cientifico;
        ELSE -- set org_id to NULL
            org_id = NULL;
        END IF;

        -- Insert peptideo
        INSERT INTO "peptideo" (
            "sintetico",
            "sequencia",
            "identificador",
            "microbiologia",
            "atividade_antifungica",
            "ensaio_celular",
            "massa_molecular",
            "massa_molar",
            "propriedades_fisico_quimicas",
            "organismo_id",
            "descoberta_lppfb"
        )
        VALUES (
            pep_row.sintetico,
            pep_row.sequencia,
            pep_row.identificador,
            pep_row.microbiologia,
            pep_row.atividade_antifungica,
            pep_row.ensaio_celular,
            pep_row.massa_molecular,
            pep_row.massa_molar,
            pep_row.propriedades_fisico_quimicas,
            org_id,
            true
        )
        RETURNING id INTO pep_id;

        -- Get the func_bio
        SELECT "value" INTO func_bio FROM temp_funcao_biologica WHERE identificador = pep_row.identificador;

        -- Insert funcao_biologica
        INSERT INTO "funcao_biologica" ("peptideo_id", "value")
        VALUES (pep_id, func_bio);
    END LOOP;
END $$;

-- Clean up: drop the temporary tables
DROP TABLE temp_organismo;
DROP TABLE temp_nome_popular;
DROP TABLE temp_peptideo;
DROP TABLE temp_funcao_biologica;
