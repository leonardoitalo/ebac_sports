import { useDispatch, useSelector } from "react-redux"
import * as S from './styles'
import { addFavorite } from "redux/favorite/slice"
import { IProps } from "interfaces/IProps"
import { RootState } from "redux/store"
import { addProduct } from "redux/product/slice"

// Função para formatar valores monetários
// eslint-disable-next-line react-refresh/only-export-components
export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ product }: IProps) => {
  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootState) => state.favorite.produtos);

  // Função para lidar com o clique no botão de adicionar ao carrinho
  const handleProductClick = () => {
    dispatch(addProduct(product))
  }

  // Função para lidar com o clique no botão de adicionar ou remover o produto dos favoritos
  const handleFavoriteClick = () => {
    dispatch(addFavorite(product))
  }

  const isFavorite = favoritos.find((p) => p.id === product.id)?.isFavorited ?? false; 

  return (
    <S.Produto>
      <S.Capa>
        <img src={product.imagem} alt={product.nome} />
      </S.Capa>
      <S.Titulo>{product.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(product.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={handleFavoriteClick} type="button">
        {isFavorite ? '- Remover dos favoritos' : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={handleProductClick} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
