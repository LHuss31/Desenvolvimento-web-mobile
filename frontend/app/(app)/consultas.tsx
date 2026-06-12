import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useAuth } from "../../hooks/auth/useAuth";
import { useAnamnesePaciente } from "../../hooks/useAnamnesePaciente";
import { useConsultas } from "../../hooks/useConsultas";
import { useModal } from "../../hooks/useModal";

// ─── Badge de status ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    concluído: { bg: "#dcfce7", text: "#15803d" },
    concluido: { bg: "#dcfce7", text: "#15803d" },
    concluida: { bg: "#dcfce7", text: "#15803d" },
    pendente: { bg: "#fef3c7", text: "#b45309" },
    agendado: { bg: "#dbeafe", text: "#1d4ed8" },
    agendada: { bg: "#dbeafe", text: "#1d4ed8" },
    cancelado: { bg: "#fee2e2", text: "#b91c1c" },
    cancelada: { bg: "#fee2e2", text: "#b91c1c" },
    aprovado: { bg: "#dcfce7", text: "#15803d" },
    aprovada: { bg: "#dcfce7", text: "#15803d" },
  };
  const key = status.toLowerCase();
  const style = map[key] ?? { bg: "#f1f5f9", text: "#475569" };
  const label = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  return (
    <View style={[badge.pill, { backgroundColor: style.bg }]}>
      <Text style={[badge.text, { color: style.text }]}>{label}</Text>
    </View>
  );
}

const badge = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    alignSelf: "flex-start",
  },
  text: { fontSize: 12, fontWeight: "600" },
});

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// ─── Modal de anamnese do paciente ───────────────────────────────────────────

function AnamneseModal({
  pacienteId,
  pacienteNome,
  onClose,
}: {
  pacienteId: number;
  pacienteNome: string;
  onClose: () => void;
}) {
  const { anamnese, isLoading, error } = useAnamnesePaciente(pacienteId);

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={modal.container}>
        {/* Header */}
        <View style={modal.header}>
          <Text style={modal.title}>{pacienteNome}</Text>
          <Pressable onPress={onClose} style={modal.closeBtn}>
            <Text style={modal.closeBtnText}>✕</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <View style={modal.center}>
            <ActivityIndicator size="large" color="#19c10f" />
          </View>
        ) : error ? (
          <View style={modal.center}>
            <Text style={modal.errorText}>Erro ao carregar anamnese</Text>
          </View>
        ) : !anamnese ? (
          <View style={modal.center}>
            <Text style={modal.emptyEmoji}>📋</Text>
            <Text style={modal.emptyText}>
              Este paciente ainda não preencheu a anamnese.
            </Text>
          </View>
        ) : (
          <ScrollView style={modal.scroll} showsVerticalScrollIndicator={false}>
            {/* Dados básicos */}
            <View style={modal.card}>
              <Text style={modal.sectionTitle}>Dados básicos</Text>
              <View style={modal.row}>
                {anamnese.idade ? (
                  <ModalInfoItem
                    label="Idade"
                    value={`${anamnese.idade} anos`}
                  />
                ) : null}
                {anamnese.peso ? (
                  <ModalInfoItem label="Peso" value={`${anamnese.peso} kg`} />
                ) : null}
                {anamnese.altura ? (
                  <ModalInfoItem
                    label="Altura"
                    value={`${anamnese.altura} cm`}
                  />
                ) : null}
                {anamnese.bmi ? (
                  <ModalInfoItem label="IMC" value={String(anamnese.bmi)} />
                ) : null}
              </View>
            </View>

            {/* Histórico de saúde */}
            {anamnese.condicoesSaude?.length || anamnese.alergias ? (
              <View style={modal.card}>
                <Text style={modal.sectionTitle}>Histórico de saúde</Text>
                {anamnese.condicoesSaude?.length ? (
                  <>
                    <Text style={modal.label}>Condições</Text>
                    <View style={modal.tagRow}>
                      {anamnese.condicoesSaude.map((c) => (
                        <View key={c} style={modal.tag}>
                          <Text style={modal.tagText}>{c}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : null}
                {anamnese.alergias ? (
                  <>
                    <Text style={[modal.label, { marginTop: 12 }]}>
                      Alergias
                    </Text>
                    <Text style={modal.value}>{anamnese.alergias}</Text>
                  </>
                ) : null}
              </View>
            ) : null}

            {/* Estilo de vida */}
            {anamnese.nivelAtividade ||
            anamnese.tipoAlimentacao?.length ||
            anamnese.habitos?.length ||
            anamnese.horasSono ? (
              <View style={modal.card}>
                <Text style={modal.sectionTitle}>Estilo de vida</Text>
                {anamnese.horasSono ? (
                  <ModalInfoItem
                    label="Horas de sono"
                    value={`${anamnese.horasSono}h`}
                  />
                ) : null}
                {anamnese.nivelAtividade ? (
                  <ModalInfoItem
                    label="Atividade física"
                    value={capitalize(anamnese.nivelAtividade)}
                  />
                ) : null}
                {anamnese.tipoAlimentacao?.length ? (
                  <>
                    <Text style={[modal.label, { marginTop: 12 }]}>
                      Alimentação
                    </Text>
                    <View style={modal.tagRow}>
                      {anamnese.tipoAlimentacao.map((t) => (
                        <View key={t} style={modal.tag}>
                          <Text style={modal.tagText}>{t}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : null}
                {anamnese.habitos?.length ? (
                  <>
                    <Text style={[modal.label, { marginTop: 12 }]}>
                      Hábitos
                    </Text>
                    <View style={modal.tagRow}>
                      {anamnese.habitos.map((h) => (
                        <View key={h} style={modal.tag}>
                          <Text style={modal.tagText}>{h}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : null}
              </View>
            ) : null}

            {/* Objetivo */}
            {anamnese.objetivo ? (
              <View style={modal.card}>
                <Text style={modal.sectionTitle}>Objetivo</Text>
                <Text style={modal.value}>{anamnese.objetivo}</Text>
              </View>
            ) : null}

            <Text style={modal.footerMeta}>
              Atualizado em{" "}
              {new Date(anamnese.atualizadoEm).toLocaleDateString("pt-BR")}
            </Text>

            <View style={{ height: 40 }} />
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

function ModalInfoItem({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  if (!value) return null;
  return (
    <View style={modal.infoItem}>
      <Text style={modal.label}>{label}</Text>
      <Text style={modal.value}>{value}</Text>
    </View>
  );
}

const modal = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#0f172a", flex: 1 },
  closeBtn: { padding: 6 },
  closeBtnText: { fontSize: 18, color: "#64748b" },
  scroll: { flex: 1, padding: 20 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  errorText: { fontSize: 14, color: "#ef4444" },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#64748b",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  infoItem: { flex: 1, minWidth: 80, marginBottom: 4 },
  label: { fontSize: 12, fontWeight: "600", color: "#94a3b8", marginBottom: 4 },
  value: { fontSize: 14, color: "#0f172a" },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  tag: {
    backgroundColor: "#f0fdf0",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  tagText: { fontSize: 12, color: "#15803d", fontWeight: "500" },
  footerMeta: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "right",
    marginBottom: 8,
  },
});

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function Consultas() {
  const [searchText, setSearchText] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [anamneseModal, setAnamneseModal] = useState<{
    pacienteId: number;
    pacienteNome: string;
  } | null>(null);

  const { setOpenModal } = useModal();
  const { consultas, isLoading, error } = useConsultas();
  const { usuario } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isMedico = usuario?.tipo === "medico";
  const isNarrow = width < 560;
  const isVeryNarrow = width < 380;

  const consultasFiltradas = consultas.filter((consulta) => {
    const q = searchText.toLowerCase();
    const pessoa = isMedico
      ? (consulta.paciente?.nome ?? "")
      : (consulta.medico?.nome ?? "");
    return (
      pessoa.toLowerCase().includes(q) ||
      consulta.status.toLowerCase().includes(q) ||
      consulta.tipo.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#19c10f" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar consultas</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={[styles.container, isNarrow && styles.containerNarrow]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <Text style={[styles.title, isNarrow && styles.titleNarrow]}>
            Minhas consultas
          </Text>
        </View>

        <View style={[styles.topBar, isNarrow && styles.topBarNarrow]}>
          <TextInput
            placeholder={
              isMedico
                ? "Buscar por paciente, tipo ou status..."
                : "Buscar por médico, tipo ou status..."
            }
            placeholderTextColor="#94a3b8"
            style={[styles.search, searchFocused && styles.searchFocused]}
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {!isMedico && (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                isVeryNarrow && styles.buttonIcon,
                pressed && { opacity: 0.85 },
              ]}
              onPress={() => setOpenModal(true)}
            >
              <Text style={styles.buttonText}>
                {isVeryNarrow ? "＋" : "＋ Agendar"}
              </Text>
            </Pressable>
          )}
        </View>

        {consultas.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>Nenhuma consulta agendada</Text>
            {!isMedico && (
              <Text style={styles.emptySubtitle}>
                Clique em &quot;＋ Agendar&quot; para criar sua primeira
                consulta.
              </Text>
            )}
          </View>
        ) : consultasFiltradas.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Nenhum resultado</Text>
            <Text style={styles.emptySubtitle}>
              Tente outro termo de busca.
            </Text>
          </View>
        ) : (
          consultasFiltradas.map((consulta) => {
            const pessoa = isMedico
              ? (consulta.paciente?.nome ?? "—")
              : (consulta.medico?.nome ?? "—");
            const pessoaLabel = isMedico ? "Paciente" : "Médico";
            const pessoaColor = isMedico ? "#1d4ed8" : "#15803d";
            const pessoaBg = isMedico ? "#dbeafe" : "#dcfce7";

            return (
              <View key={consulta.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardPessoa}>
                    <View
                      style={[styles.pessoaTag, { backgroundColor: pessoaBg }]}
                    >
                      <Text
                        style={[styles.pessoaTagText, { color: pessoaColor }]}
                      >
                        {pessoaLabel}
                      </Text>
                    </View>
                    <Text style={styles.cardName} numberOfLines={1}>
                      {pessoa}
                    </Text>
                  </View>
                  <StatusBadge status={consulta.status} />
                </View>

                <View
                  style={[styles.infoGrid, isNarrow && styles.infoGridNarrow]}
                >
                  <View
                    style={isNarrow ? styles.infoItemFull : styles.infoItem}
                  >
                    <Text style={styles.infoLabel}>Data / Horário</Text>
                    <Text style={styles.infoValue}>
                      {new Date(consulta.dataHora).toLocaleDateString("pt-BR")}{" "}
                      •{" "}
                      {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>

                  <View
                    style={isNarrow ? styles.infoItemHalf : styles.infoItem}
                  >
                    <Text style={styles.infoLabel}>Tipo</Text>
                    <Text style={styles.infoValue}>
                      {capitalize(consulta.tipo)}
                    </Text>
                  </View>

                  <View
                    style={isNarrow ? styles.infoItemHalf : styles.infoItem}
                  >
                    <Text style={styles.infoLabel}>Pagamento</Text>
                    <StatusBadge status={consulta.statusPagamento} />
                  </View>
                </View>

                <View
                  style={[
                    styles.cardFooter,
                    isNarrow && styles.cardFooterNarrow,
                  ]}
                >
                  <Pressable
                    style={({ pressed }) => [
                      styles.docBtn,
                      pressed && { opacity: 0.75 },
                    ]}
                    onPress={() => router.push(`/documentos/${consulta.id}`)}
                  >
                    <Text style={styles.docBtnText}>📄 Ver documentos</Text>
                  </Pressable>

                  {/* Botão de anamnese — visível apenas pro médico */}
                  {isMedico && consulta.paciente && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.anamneseBtn,
                        pressed && { opacity: 0.75 },
                      ]}
                      onPress={() =>
                        setAnamneseModal({
                          pacienteId: consulta.paciente!.id,
                          pacienteNome: consulta.paciente!.nome,
                        })
                      }
                    >
                      <Text style={styles.anamneseBtnText}>
                        📋 Ver anamnese
                      </Text>
                    </Pressable>
                  )}

                  {consulta.tipo === "teleconsulta" && consulta.linkMeet && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.meetBtn,
                        pressed && { opacity: 0.85 },
                      ]}
                    >
                      <Text style={styles.meetBtnText}>🎥 Entrar via meet</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Modal de anamnese */}
      {anamneseModal && (
        <AnamneseModal
          pacienteId={anamneseModal.pacienteId}
          pacienteNome={anamneseModal.pacienteNome}
          onClose={() => setAnamneseModal(null)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f8fafc" },
  containerNarrow: { padding: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  title: { fontSize: 24, fontWeight: "700", color: "#0f172a" },
  titleNarrow: { fontSize: 20 },
  topBar: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  topBarNarrow: { marginBottom: 14 },
  search: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
    color: "#0f172a",
  },
  searchFocused: { borderColor: "#19c10f" },
  button: {
    backgroundColor: "#19c10f",
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 12,
    shadowColor: "#19c10f",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonIcon: { paddingHorizontal: 14 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  emptyCard: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#64748b",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  emptyEmoji: { fontSize: 36, marginBottom: 12 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  emptySubtitle: { fontSize: 13, color: "#94a3b8", textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#64748b",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8,
  },
  cardPessoa: { flex: 1, gap: 4 },
  pessoaTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 2,
  },
  pessoaTagText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardName: { fontWeight: "700", fontSize: 16, color: "#0f172a" },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  infoGridNarrow: { gap: 12 },
  infoItem: { flex: 1, minWidth: 120 },
  infoItemFull: { width: "100%" },
  infoItemHalf: { flex: 1, minWidth: 0 },
  infoLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  infoValue: { fontSize: 14, color: "#374151", fontWeight: "500" },
  cardFooter: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 14,
    flexWrap: "wrap",
  },
  cardFooterNarrow: { gap: 8 },
  docBtn: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  docBtnText: { color: "#475569", fontSize: 13, fontWeight: "500" },
  anamneseBtn: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  anamneseBtnText: { color: "#1d4ed8", fontSize: 13, fontWeight: "500" },
  meetBtn: {
    backgroundColor: "#19c10f",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    shadowColor: "#19c10f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  meetBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  errorText: { color: "#ef4444", fontSize: 16, textAlign: "center" },
});
