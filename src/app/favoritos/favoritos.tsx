import FavoriteCard from "@/components/FavoriteCard";
import { Spacing } from "@/constants/theme";
import { useFav } from "@/services/FavoriteContext";
import { FlatList, View } from "react-native";

export default function favoritos() {

    const { favorite } = useFav();
    const favoritos = favorite

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={favoritos}
                style={{ paddingHorizontal: Spacing.three, paddingTop: Spacing.three, flex: 1 }}
                renderItem={(fav) => <FavoriteCard favItem={fav} />}
                keyExtractor={fav => fav.id}
            />
        </View>
    )
}