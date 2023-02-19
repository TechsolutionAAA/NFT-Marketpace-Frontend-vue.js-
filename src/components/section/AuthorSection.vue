<template>
  <section class="author-section section-space">
    <div class="container">
      <div class="row">
        <div class="col-xl-3">
          <AuthorSidebar
              :user="user"
              :followingNum="
              SectionData.authorSidebarData.sidebarWidget.followingNum
            "
              :followingText="
              SectionData.authorSidebarData.sidebarWidget.followingText
            "
              :followerNum="
              SectionData.authorSidebarData.sidebarWidget.followerNum
            "
              :followerText="
              SectionData.authorSidebarData.sidebarWidget.followerText
            "
              :avatars="
              SectionData.authorSidebarData.sidebarWidget.followersAvatar
            "
          />
        </div>
        <!-- end col -->
        <div class="col-xl-9 ps-xl-4">
          <div class="author-items-wrap">
            <ul
                class="nav nav-tabs nav-tabs-s1"
                id="myTab"
                role="tablist"
            >
              <li
                  class="nav-item"
                  role="presentation"
                  v-for="list in SectionData.authorSidebarData.authorTabNav"
                  :key="list.id"
              >
                <button
                    class="nav-link"
                    :class="list.isActive"
                    :id="list.slug"
                    data-bs-toggle="tab"
                    :data-bs-target="list.bsTarget"
                    type="button"
                >
                  {{ list.title }}
                </button>
              </li>
            </ul>
            <div class="gap-2x"></div>
            <!-- end gap-2x -->
            <div
                class="tab-content"
                id="myTabContent"
            >
              <!--              HELPER: NFT LIST TEMPLATE WITH TEMPLATE DATA-->
              <!--              <div class="tab-pane fade show active" id="on-sale" role="tabpanel" aria-labelledby="on-sale-tab">
                              <div class="row g-gs">
                                <div class="col-md-4" v-for="product in SectionData.productData.onSaleList" :key="product.id">
                                  <div class="card card-full">
                                    <div class="card-image">
                                      <img :src="product.img" class="card-img-top" alt="art image">
                                    </div>
                                    <div class="card-body p-4">
                                      <h5 class="card-title text-truncate mb-0">{{ product.title }}</h5>
                                      <div class="card-author mb-1 d-flex align-items-center">
                                        <span class="me-1 card-author-by">By</span>
                                        <div class="custom-tooltip-wrap">
                                          <router-link :to="product.authorLink" class="author-link">{{ product.author }}</router-link>
                                        </div>&lt;!&ndash; end custom-tooltip-wrap &ndash;&gt;
                                      </div>&lt;!&ndash; end card-author &ndash;&gt;
                                      <div class="card-price-wrap d-flex align-items-center justify-content-sm-between mb-3">
                                        <div class="me-5 me-sm-2">
                                          <span class="card-price-title">Price</span>
                                          <span class="card-price-number">&dollar;{{ product.price }}</span>
                                        </div>
                                        <div class="text-sm-end">
                                          <span class="card-price-title">Current bid</span>
                                          <span class="card-price-number">{{ product.priceTwo }} ETH</span>
                                        </div>
                                      </div>&lt;!&ndash; end card-price-wrap &ndash;&gt;
                                      <span class="btn btn-sm btn-dark">Place Bid</span>
                                    </div>&lt;!&ndash; end card-body &ndash;&gt;
                                    <router-link
                                        class="details"
                                        :to="{
                                                                            name: 'ProductDetail',
                                                                            params: {
                                                                            id: product.id,
                                                                            title: product.title,
                                                                            metaText: product.metaText,
                                                                            price: product.price,
                                                                            priceTwo: product.priceTwo,
                                                                            imgLg: product.imgLg,
                                                                            metaText: product.metaText,
                                                                            metaTextTwo: product.metaTextTwo,
                                                                            metaTextThree: product.metaTextThree,
                                                                            content: product.content,
                                                                            }
                                                                        }"
                                    >
                                    </router-link>
                                  </div>&lt;!&ndash; end card &ndash;&gt;
                                </div>&lt;!&ndash; end col &ndash;&gt;
                              </div>&lt;!&ndash; row &ndash;&gt;
                            </div> end tab-pane -->
              <div
                  v-for="list in SectionData.authorSidebarData.authorTabNav"
                  :key="list.id"
                  class="tab-pane fade show active"
                  :id="list.bsTarget"
                  role="tabpanel"
                  :aria-labelledby="list.slug"
              >
                <div class="row g-gs">
                  <div
                      class="col-md-4"
                      v-for="nft in ownedNfts"
                      :key="nft.block_number"
                  >
                    <div class="card card-full body-container">
                      <div
                          class="card-image"
                          @click="
                          nft.metadata
                            ? gotodetail(
                                nft.token_address,
                                nft.token_id,
                                nft.metadata.name,
                              )
                            : () => {}
                        "
                      >
                        <img
                            v-if="nft.metadata && `image` in nft.metadata"
                            :src="
                            nft.metadata.image.includes(`https://`, 0)
                              ? nft.metadata.image
                              : nft.metadata.image.includes(`ipfs://`)
                              ? `https://ipfs.io/ipfs/${nft.metadata.image.substr(
                                  7,
                                )}`
                              : `https://gate.scenez.io/ipfs/Qme71LKv3QcaeWJB6Fh7SH8Yo87JXDkqSsaoE3HWqk2EbB`
                          "
                            class="card-img-top"
                            alt="art image"
                        />
                        <img
                            v-else
                            src="https://gate.scenez.io/ipfs/Qme71LKv3QcaeWJB6Fh7SH8Yo87JXDkqSsaoE3HWqk2EbB"
                            class="card-img-top"
                            alt="art image"
                        />
                      </div>
                      <div class="card-body p-4">
                        <h5
                            v-if="nft.metadata && `name` in nft.metadata"
                            class="card-title text-truncate mb-0"
                        >
                          {{ nft.metadata.name }}
                        </h5>
                        <h5 v-else>not supported</h5>
                        <div class="card-author mb-1 d-flex align-items-center">
                          <span class="me-1 card-author-by">By</span>
                          <div class="custom-tooltip-wrap d-flex">
                            <router-link
                                :to="`/user/${user.account}`"
                                class="custom-tooltip author-link copy-input"
                            >
                              {{ user.account }}
                            </router-link>
                          </div>
                          <!-- end custom-tooltip-wrap -->
                        </div>
                        <!-- end card-author -->
                        <div
                            class="card-price-wrap d-flex align-items-center justify-content-between mb-3"
                        >
                          <div
                              v-if="nft.metadata && `price` in nft.metadata"
                              class="me-2"
                          >
                            <!-- <span class="card-price-title">Price</span> -->
                            <span class="card-price-number">
                              {{ nft.metadata.price }} ETH
                            </span>
                          </div>
                          <div
                              v-if="nft.metadata && `currentBid` in nft.metadata"
                              class="text-sm-end"
                          >
                            <span class="card-price-title">Current bid</span>
                            <span class="card-price-number">
                              {{ nft.metadata.currentBid }} ETH
                            </span>
                          </div>
                          <div
                              v-if="nft.metadata && `description` in nft.metadata"
                              class="text-truncate"
                          >
                            <span class="card-price-number">
                              {{ nft.metadata.description }}
                            </span>
                          </div>
                          <div
                              v-else
                              class="text-truncate"
                          >
                            <span class="card-price-number">not supported</span>
                          </div>
                        </div>
                        <div
                            v-if="
                            nft.metadata && `collection_name` in nft.metadata
                          "
                            class="text-truncate"
                        >
                          <span
                              class="card-price-title"
                              id="special"
                          >
                            Scenez Official Mint
                          </span>
                        </div>
                      </div>
                      <div
                          class="card-price-wrap d-flex align-items-center justify-content-center mb-3"
                      >
                        <div
                            class="text-truncate"
                            v-if="nft.metadata && `name` in nft.metadata"
                        >
                          <button
                              v-if="
                              this.currentaddress.toLowerCase() ==
                              nft.owner_of.toLowerCase()
                            "
                              class="btn btn-dark"
                              @click="this.storedb(nft)"
                          >
                            List For Sale
                          </button>
                        </div>
                        <div
                            class="d-flex align-items-center justify-content-center"
                            v-else
                        >
                          <span
                              class="card-price-number"
                              id="issue_msg"
                          >
                            This NFT Item's Metadata isn't standard.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- row -->
              </div>
              <!-- end tab-pane -->
            </div>
            <!-- end tab-content -->
          </div>
          <!-- end author-items-wrap -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- .container -->
    <!-- Modal -->
    <div
        class="modal fade"
        id="reportModal"
        tabindex="-1"
        aria-labelledby="reportModalLabel"
        aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4
                class="modal-title"
                id="reportModalLabel"
            >
              {{ SectionData.reportModalData.title }}
            </h4>
            <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
            >
              <em class="ni ni-cross"></em>
            </button>
          </div>
          <div class="modal-body">
            <p
                class="modal-text mb-2"
                v-html="SectionData.reportModalData.content"
            ></p>
            <p
                class="modal-text mb-3"
                v-html="SectionData.reportModalData.contentTwo"
            ></p>
            <form action="#">
              <input
                  type="email"
                  class="form-control form-control-s1 mb-3"
                  placeholder="Enter your email"
              />
              <textarea
                  name="message"
                  rows="6"
                  class="form-control form-control-s1 mb-3"
                  :placeholder="SectionData.reportModalData.placeholderText"
              ></textarea>
              <button
                  class="btn btn-dark w-100"
                  type="submit"
              >
                {{ SectionData.reportModalData.btnText }}
              </button>
            </form>
          </div>
          <!-- end modal-body -->
        </div>
        <!-- end modal-content -->
      </div>
      <!-- end modal-dialog -->
    </div>
    <!-- end modal-->
    <!-- Modal -->
  </section>
  <!-- end author-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import AuthorSidebar from '@/components/common/AuthorSidebar';
import nftManagement from '@/services/api/nftManagement';
import Swal from 'sweetalert2';

export default {
  name: 'AuthorSection',
  components: {
    AuthorSidebar,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    SectionData,
    currentaddress: '',
    ownedNfts: [],
  }),

  created() {
    this.getOwnedNFTs();
  },
  methods: {
    async gotodetail(token_address, token_id, metadataname) {
      this.$router.push({
        name: 'itemDetails',
        params: {
          address: token_address,
          tokenid: token_id,
          formatedTitle: metadataname.replaceAll(/[ #]/g, '-'),
          title: metadataname,
        },
      });
    },
    async storedb(nft) {
      console.log(nft);
      let flagforsale = nft.metadata.collection_name == undefined ? false : true;
      console.log(flagforsale);
      let account = this.user.account.toLowerCase();
      let vrcode = sessionStorage.getItem('vrcode');
      let nftid = '';
      let nft_mint_status = false;
      let logo =
          nft.metadata.image.charCodeAt(nft.metadata.image.length - 3) == 46 ||
          nft.metadata.image.charCodeAt(nft.metadata.image.length - 4) == 46
              ? nft.metadata.image
              : nft.metadata.image.substr(nft.metadata.image.length - 46);
      let logoext = nft.metadata.imageextension
          ? nft.metadata.imageextension
          : nft.metadata.image.substr(nft.metadata.image.length - 3);
      let featured = logo;
      let banner = logo;
      let itemimage = logo;
      let publicmint = false;
      let isdraft = false;
      let title = nft.name;
      let description = nft.metadata.description;
      let contract = nft.token_address;
      let category = 'Image';
      let royalty = 10;
      let collaborators = ['0xaaaffAb7763fB811f3d4C692BdA070A8474BcE93'];
      let ratespercollaborators = ['100'];
      let item_title = null;
      let supply = nft.amount;
      let mintdate = 0;
      let mintprice = 0;
      let weblink = '';
      let discord = '';
      let instagram = '';
      let medium = '';
      let telegram = '';

      Swal.fire({
        title:
            '<h3 style=\'color: #25BE40\'>Import Your NFT to list for sale in SCENEZ.io</h3>',
        text: 'Are you sure ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Import!',
      })
          .then(async (result) => {
            if (result.isConfirmed) {
              await nftManagement
                  .saveNftdata(
                      account,
                      vrcode,
                      nftid,
                      nft_mint_status,
                      logo,
                      logoext,
                      featured,
                      banner,
                      itemimage,
                      publicmint,
                      isdraft,
                      title,
                      description,
                      contract,
                      category,
                      royalty,
                      collaborators,
                      ratespercollaborators,
                      item_title,
                      supply,
                      mintdate,
                      mintprice,
                      weblink,
                      discord,
                      instagram,
                      medium,
                      telegram,
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              await nftManagement
                  .setItem(
                      flagforsale,
                      false,
                      nft.name,
                      nft.metadata.name,
                      nft.metadata.description,
                      logo,
                      logoext,
                      null,
                      null,
                      nft.token_uri,
                      nft.owner_of.toLowerCase(),
                      nft.token_id,
                      [],
                      [],
                      [],
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.error(err));
              this.$router.push('/explore');
            }
          });
    },

    async getOwnedNFTs() {
      if (this.$cookies.get('connectionType') == 'mt') {
        this.currentaddress = window.ethereum.selectedAddress;
      } else if (this.$cookies.get('connectionType') == 'wc') {
        this.currentaddress = localStorage.getItem('wc_account');
      } else {
        this.$router.push('/connect');
      }
      try {
        const {
          data,
          status
        } = await nftManagement.getNFTsByOwner(
            this.user.account,
        );
        if (status == 200) {
          for (var i = 0; i < data.result.length; i++) {
            var delta = data.result[i];
            delta.metadata = JSON.parse(delta.metadata);
            this.ownedNfts.push(delta);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
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

#special {
  color: #25be40;
}

.card-img-top {
  height: 150px;
}

#issue_msg {
  color: red;
  text-align: center;
}

.body-container {
  cursor: pointer !important;
}
</style>
