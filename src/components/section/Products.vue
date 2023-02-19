<template>
  <div class="card card-full">
    <div class="card-image">
      <img
          :src="product.NFT_featured.includes(`https://`, 0) ? product.NFT_featured : product.NFT_featured.includes(`ipfs://`) ? `https://ipfs.io/ipfs/${product.NFT_featured.substr(7)}` : imageprefix + product.NFT_featured "
          class="card-img-top"
          alt="art image"
      >
      <!-- `https://gate.scenez.io/ipfs/Qme71LKv3QcaeWJB6Fh7SH8Yo87JXDkqSsaoE3HWqk2EbB` -->
    </div>
    <div class="card-body p-4">
      <h5 class="card-title text-truncate mb-0">{{ product.NFT_Title }}</h5>
      <div class="card-author mb-1 d-flex align-items-center">
        <span class="me-1 card-author-by">By</span>
        <div class="custom-tooltip author-link">{{
            product.creator.substring(0, 6)
          }}...{{ product.creator.substring(37, 42) }}
        </div>
      </div><!-- end card-author -->
      <div class="card-price-wrap d-flex align-items-center justify-content-sm-between mb-3">
        <div class="me-5 me-sm-2">
          <span class="card-price-title">Price</span>
          <span class="card-price-number">{{ product.mintprice }} ETH</span>
        </div>
        <div class="text-sm-end">
          <span class="card-price-title">Current bid</span>
          <span class="card-price-number">0 ETH</span>
        </div>
      </div><!-- end card-price-wrap -->
      <div class="card-price-wrap d-flex align-items-center justify-content-sm-between mb-3">
        <div class="me-5 me-sm-2">
          <span class="card-price-title">Created Date</span>
          <span class="card-price-number">{{ product.NFT_Created_date.substring(0, 10) }}</span>
        </div>
        <div class="text-sm-end">
          <span class="card-price-title">Items</span>
          <span class="card-price-number">{{ product.NFT_ITEMS.filter(d => d.tokenId != 0).length }}</span>
        </div>
      </div>
      <!-- <span class="btn btn-sm btn-dark">Place Bid</span> -->
    </div><!-- end card-body -->
    <router-link
        v-if="product.nft_mint_status"
        class="details"
        :to="{ name: 'ExploreCollection', params: {
                collection: product.NFT_Contract,
                title: product.NFT_Title,
                logo: product.NFT_logo,
                featured: product.NFT_featured,
                banner: product.NFT_banner,
                description: product.NFT_Description
            }
        }"
    ></router-link>
    <router-link
        v-if="!product.nft_mint_status"
        class="details"
        :to="{ name: 'BetaExploreCollection', params: {
                collection: product.NFT_Contract,
                title: product.NFT_Title,
                description: product.NFT_Description,
                logo: product.NFT_logo,
                nft_mint_status: product.nft_mint_status
            }
        }"
    ></router-link>
  </div><!-- end card -->
</template>
<script>
export default {
  name: 'Products',
  props: ['product'],
  data() {
    return {
      imageprefix: 'https://gate.scenez.io/ipfs/'
    };
  },
};
</script>

<style
    lang="css"
    scoped
>
.details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.author-link,
.card-price-wrap {
  z-index: 2;
  position: relative;
}

.card-img-top {
  height: 200px;
}
</style>
