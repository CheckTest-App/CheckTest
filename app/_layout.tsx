import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Navegar para a tela de login ao carregar o componente
    router.push("/screens/LoginScreen");
  }, [router]);

  return (
    <Stack>
      {/* Aqui você pode definir suas telas ou renderizar conteúdo adicional se necessário */}
    </Stack>
  );
}
