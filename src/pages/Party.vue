<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
    </header>
    <!-- create -->
    <section
      class="create-section bg-pattern section-space-b pt-4 pt-md-5 mt-md-4"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-2 col-lg-4 col-xl-4" id="my_friend_container">
            <h3 class="mb-3">My Friends</h3>
            <div class="list">
              <div class="activity-tab-wrap">
                <div
                  class="card card-creator-s1 mb-4"
                  v-for="item in users"
                  :key="item.id"
                >
                  <div
                    class="card-body d-flex align-items-center"
                    v-if="
                      online.indexOf(`ch-user-${item.account}-present`) != -1
                    "
                  >
                    <div class="avatar avatar-1 flex-shrink-0">
                      <img :src="prefix + item.avatar" alt="avatar" />
                    </div>
                    <div class="listcontent">
                      <h6 class="card-s1-title">
                        {{ item.firstname }}&nbsp;{{ item.lastname }}
                        <br />
                        <span>
                          <svg
                            style="color: #29d23a;"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.05025 3.63579C5.44078 4.02631 5.44078 4.65948 5.05025 5.05C2.31658 7.78367 2.31658 12.2158 5.05025 14.9495C5.44078 15.34 5.44078 15.9732 5.05025 16.3637C4.65973 16.7542 4.02656 16.7542 3.63604 16.3637C0.12132 12.849 0.12132 7.15051 3.63604 3.63579C4.02656 3.24526 4.65973 3.24526 5.05025 3.63579ZM14.9498 3.63602C15.3403 3.2455 15.9735 3.2455 16.364 3.63602C19.8787 7.15074 19.8787 12.8492 16.364 16.3639C15.9735 16.7545 15.3403 16.7545 14.9498 16.3639C14.5592 15.9734 14.5592 15.3403 14.9498 14.9497C17.6834 12.2161 17.6834 7.78391 14.9498 5.05023C14.5592 4.65971 14.5592 4.02655 14.9498 3.63602ZM7.87869 6.46422C8.26921 6.85474 8.26921 7.48791 7.87869 7.87843C6.70711 9.05 6.70711 10.9495 7.87869 12.1211C8.26921 12.5116 8.26921 13.1448 7.87868 13.5353C7.48816 13.9258 6.855 13.9258 6.46447 13.5353C4.51185 11.5827 4.51185 8.41684 6.46447 6.46422C6.855 6.07369 7.48816 6.07369 7.87869 6.46422ZM12.1213 6.46445C12.5119 6.07392 13.145 6.07392 13.5355 6.46445C15.4882 8.41707 15.4882 11.5829 13.5355 13.5355C13.145 13.926 12.5119 13.926 12.1213 13.5355C11.7308 13.145 11.7308 12.5118 12.1213 12.1213C13.2929 10.9497 13.2929 9.05023 12.1213 7.87866C11.7308 7.48814 11.7308 6.85497 12.1213 6.46445ZM10 8.99998C10.5523 8.99998 11 9.4477 11 9.99998V10.01C11 10.5623 10.5523 11.01 10 11.01C9.44772 11.01 9 10.5623 9 10.01V9.99998C9 9.4477 9.44772 8.99998 10 8.99998Z"
                              fill="#29D23A"
                            ></path>
                          </svg>
                          &nbsp;&nbsp;&nbsp;online
                        </span>
                      </h6>
                      <div id="invitebutton" @click="invite(item.account)">
                        <img :src="invitepng" id="invite_image" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end card -->
              </div>
            </div>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-8" id="container">
            <!-- <div
                id="success-alert"
                class="alert alert-success alert-dismissible fade show"
                role="alert"
            > -->
            <!-- <strong>{{this.creator != null ? this.creator : this.myname }}'s Party</strong> -->
            <!-- <a href="" target="_blank" id="invite">here</a> -->
            <!-- </div> -->

            <div class="container">
              <div class="button-group">
                <button
                  id="join"
                  type="submit"
                  class="btn btn-primary btn-sm"
                  @click="join"
                >
                  Join(Create)
                </button>
                <button
                  id="leave"
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="leavechannel"
                >
                  Leave
                </button>
                <button
                  id="audio_mute"
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="audio_mute"
                >
                  Audio Mute
                </button>
                <button
                  id="video_mute"
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="video_mute"
                >
                  Video Mute
                </button>
              </div>
              <div class="row video-group">
                <div class="col" id="my_video">
                  <p id="local-player-name" class="player-name"></p>
                  <div id="local-player" class="player"></div>
                </div>
                <div class="w-100"></div>
                <div class="col">
                  <div
                    v-for="item in items"
                    :key="item.id"
                    id="remote-playerlist"
                  >
                    <span v-html="item[0]" id="remote" />
                  </div>
                </div>
              </div>
            </div>
            <!-- end create-content-box -->
          </div>
          <!-- end col -->
        </div>
        <!-- row-->
      </div>
      <!-- end container -->
    </section>
    <!-- end create-section -->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
import { useToast } from "vue-toastification";
import { mapGetters } from 'vuex'
import SectionData from '@/store/store.js'
import jwt_decode from 'jwt-decode'
import User from '../services/api/userManagement'
import Party from '../services/api/partyMangement'
import AgoraRTC from 'agora-rtc-sdk-ng'
import Friends from '../services/api/friendList'
import checkpng from '../images/custom/check.jpg'
import closepng from '../images/custom/close.png'
import invitepng from '../images/invite.jpg'
import favorite from '../images/favorite1.png'

export default {
  name: 'Create',
  data() {
    return {
      AgoraRTC,
      SectionData,
      checkpng,
      closepng,
      invitepng,
      favorite,
      myname: null,
      creator: null,
      account:
        this.$cookies.get('connectionType') == 'mt'
          ? window.ethereum.selectedAddress
          : this.$cookies.get('connectionType') == 'wc'
          ? localStorage.getItem('wc_account')
          : null,
      vrcode: sessionStorage.getItem('vrcode'),
      temppushedData: [],
      users: [],
      prefix: 'https://gate.scenez.io/ipfs/',
      flag: false,
      code: '',
      online: null,
      localTracks: { videoTrack: null, audioTrack: null },
      remoteUsers: {},
      options: {
        appid: null,
        channel: null,
        uid: null,
        token: null,
      },
      vidoemuted: false,
      audiomuted: false,
      items: [],
      item: [],
    }
  },
  methods: {
    changecode: async function (val) {
      this.code = val
    },
    async getRandomString() {
      let randomChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let results = ''

      for (let i = 0; i < 6; i++) {
        results += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length),
        )
      }

      return results
    },
    async getRandomnumber() {
      let randomChars = '0123456789'
      let result = ''
      for (let i = 0; i < 8; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length),
        )
      }

      return result
    },

    goToConnection: function () {
      this.$router.push('/connect')
    },
    join: async function () {
      await this.getRandomString().then((res) => {
        this.options.channel = res
      })

      await User.getToken(this.options.channel).then((res) => {
        this.options.token = res.data.token
        this.options.appid = res.data.appid
      })
      if (this.options.token) {
        await Party.createParty(
          this.account.toLowerCase(),
          this.vrcode,
          this.myname,
          this.options.channel,
          this.options.token,
          this.options.uid,
        )
          .then(async (res) => {
            if (res.data.msg == 'success') {
              await this.joinchannel()
              await this.getallusers()
              this.toast.success('Joined party successfully!')
              document.getElementById('my_friend_container').style.display =
                'block'
              // document.getElementById("success-alert").style.display = "block";
              document.getElementById('join').style.display = 'none'
              document.getElementById('join').style.pointerEvents = 'none'
              document.getElementById('join').style.backgroundColor = 'gray'
              document.getElementById('leave').style.display = 'block'
              document.getElementById('leave').style.pointerEvents = 'auto'
              document.getElementById('leave').style.backgroundColor = '#7952b3'
              document.getElementById('audio_mute').style.display = 'block'
              document.getElementById('audio_mute').style.pointerEvents = 'auto'
              document.getElementById('audio_mute').style.backgroundColor =
                '#7952b3'
              document.getElementById('video_mute').style.display = 'block'
              document.getElementById('video_mute').style.pointerEvents = 'auto'
              document.getElementById('video_mute').style.backgroundColor =
                '#7952b3'
            } else if (res.data.msg == 'You already create one Channel') {
              this.toast.error('You have already created a party!')
            } else if (res.data.msg == 'channel is required') {
              this.toast.error('Create a party first!')
            } else if (res.data.msg == 'Wrong VR Code!') {
              this.toast.error('Wrong Security Code!')
            }
          })
          .catch((err) => console.error(err))
      }
    },
    joinchannel: async function () {
      // Add an event listener to play remote tracks when remote user publishes
      this.client.on('user-published', this.handleUserPublished)
      this.client.on('user-joined', this.handleUserJoined)
      this.client.on('user-left', this.handleUserLeft)
      // Join a channel and create local tracks. Best practice is to use Promise, all and run them concurrently.
      ;[
        this.options.uid,
        this.localTracks.audioTrack,
        this.localTracks.videoTrack,
      ] = await Promise.all([
        // Join the channel
        this.client.join(
          this.options.appid,
          this.options.channel,
          this.options.token || null,
          this.options.uid || null,
        ),
        // Create Tracks to the local microphone and camera.
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
      ])

      console.log(this.options.appid)
      console.log(this.options.channel)
      console.log(this.options.token)
      console.log(this.options.uid)
      // Play the local video track to the local browser and update the UI with the user ID.
      this.localTracks.videoTrack.play('local-player')
      document.getElementById(
        'local-player-name',
      ).innerHTML = `Party Name(${this.options.channel})(${this.options.uid})`
      // Publish the local video and audio tracks to the channel.
      await this.client.publish(this.localTracks.videoTrack)
      await this.client.publish(this.localTracks.audioTrack)
    },
    handleUserPublished: async function (user, mediaType) {
      this.subscribe(user, mediaType)
    },
    handleUserJoined: async function (user) {
      const id = user.uid
      if (this.remoteUsers[id] == undefined) {
        this.remoteUsers[id] = user
      }
    },
    handleUserLeft: function (user) {
      const id = user.uid
      delete this.remoteUsers[id]
      document.getElementById(`player-wrapper-${id}`).remove()
    },
    subscribe: async function (user, mediaType) {
      const uid = user.uid
      // Subscribe to a remote user
      await this.client
        .subscribe(user, mediaType)
        .catch((err) => console.error(err))
      if (mediaType == 'audio') {
        user.audioTrack.play()
      }
      if (mediaType == 'video') {
        if (!document.getElementById(`player-wrapper-${uid}`)) {
          this.item = [
            `<div id="player-wrapper-${uid}"><p class="player-name">remoteUser(${uid})</p><div id="player-${uid}" class="player"></div></div>`,
          ]
          this.items.push(this.item)
        }
        setTimeout(() => {
          user.videoTrack.play(`player-${uid}`)
        }, 2000)
      }
    },
    leavechannel: async function () {
      for (var trackName in this.localTracks) {
        var track = this.localTracks[trackName]
        if (track) {
          track.stop()
          track.close()
          this.localTracks[trackName] = undefined
        }
      }
      await Party.leaveParty(this.account.toLowerCase(), this.options.channel)
        .then(async (res) => {
          if (res.data.msg == 'Success') {
            // Remove remote users and player views
            this.remoteUsers = {}
            document.getElementById('remote-playerlist').innerHTML = ''

            // leave the channel
            await this.client.leave()

            document.getElementById('local-player-name').innerHTML = ''
            this.toast.success('A user has left the party!')
            // document.getElementById("success-alert").style.display = "none";
            document.getElementById('my_friend_container').style.display =
              'none'
            document.getElementById('leave').style.display = 'none'
            document.getElementById('leave').style.pointerEvents = 'none'
            document.getElementById('leave').style.backgroundColor = 'gray'
            document.getElementById('audio_mute').style.display = 'none'
            document.getElementById('audio_mute').style.pointerEvents = 'none'
            document.getElementById('audio_mute').style.backgroundColor = 'gray'
            document.getElementById('video_mute').style.display = 'none'
            document.getElementById('video_mute').style.pointerEvents = 'none'
            document.getElementById('video_mute').style.backgroundColor = 'gray'
            document.getElementById('join').style.display = 'block'
            document.getElementById('join').style.pointerEvents = 'auto'
            document.getElementById('join').style.backgroundColor = '#7952b3'
            this.$router.push('/profile')
          }
        })
        .catch((err) => console.error(err))
    },
    audio_mute: async function () {
      if (this.localTracks.audioTrack == null) return

      if (this.audiomuted == false) {
        await this.localTracks.audioTrack.setMuted(true)
        this.audiomuted = true
        document.getElementById('audio_mute').innerHTML = 'Audio unMute'
        this.toast.success('Audio Muted!')
      } else if (this.audiomuted == true) {
        await this.localTracks.audioTrack.setMuted(false)
        this.audiomuted = false
        document.getElementById('audio_mute').innerHTML = 'Audio Mute'
        this.toast.success('Audio UnMuted!')
      }
    },
    video_mute: async function () {
      if (this.localTracks.videoTrack == null) return

      if (this.vidoemuted == false) {
        await this.localTracks.videoTrack.setMuted(true)
        this.vidoemuted = true
        document.getElementById('video_mute').innerHTML = 'Video unMute'
        this.toast.success('Video Paused!')
      } else if (this.vidoemuted == true) {
        await this.localTracks.videoTrack.setMuted(false)
        this.vidoemuted = false
        document.getElementById('video_mute').innerHTML = 'Video Mute'
        this.toast.success('Video Resumed!')
      }
    },
    invite: async function (val) {
      console.log(this.options)
      console.log(this.options.channel)
      console.log(this.account)
      console.log(this.options.token)
      await Party.inviteRequest(
        val.toLowerCase(),
        this.options.channel,
        this.account.toLowerCase(),
        this.options.token,
      )
        .then(async (res) => {
          if (res.data.msg == true) {
            await Party.sentInviteRequest(
              this.options.channel,
              val.toLowerCase(),
              this.options.token,
            ).then((resp) => {
              if (resp.data.msg == true) {
                this.toast.success('Invite Success!')
              }
            })
          } else if (res.data.msg == false) {
            this.toast.error('User already invited!')
          }
        })
        .catch((err) => console.error(err))
    },
    getallusers: async function () {
      if (this.account !== null && this.vrcode !== null) {
        await Friends.getFriends(this.account.toLowerCase(), this.vrcode)
          .then((res) => {
            this.temppushedData.push(res.data)
            this.users = this.temppushedData[0]
          })
          .catch((err) => console.error(err))
      }
    },
  },
  mounted: async function () {
    // Enable log upload
    AgoraRTC.enableLogUpload()
    // Set the log output level as Info
    AgoraRTC.setLogLevel(0)

    if (this.pubnub !== null) {
      var vm = this
      // Which Friends are online right now
      vm.online = []

      this.pubnub.hereNow(
        {
          channelGroups: [`cg-user-${this.account}-friends`],
        },
        function (status, response) {
          if (status.error) {
            console.log('operation failed w/ error:', status)
          } else {
            for (var i = 0; i < Object.keys(response.channels).length; i++) {
              console.log(Object.keys(response.channels)[i])
              vm.online.push(Object.keys(response.channels)[i])
            }
          }
        },
      )

      // Watch Friends come online / go offline
      this.pubnub.subscribe({
        channelGroups: [`cg-user-${this.account}-friends-pnpres`],
        withPresence: true,
      })

      // Get Remove Friend from friendlist Status Feed Messages
      this.pubnub.subscribe({
        channelGroups: [`cg-user-${this.account}-status-feed`],
      })
    }
  },
  computed: {
    ...mapGetters('auth', {
      userData: 'user',
      sessionToken: 'sessionToken',
      pubnub: 'pubnub',
    }),
  },
  async created() {
    if (sessionStorage.getItem('jwt') == null) {
      this.$router.push('/connect')
    } else if (
      jwt_decode(sessionStorage.getItem('jwt')).exp <
      new Date() / 1000
    ) {
      this.$router.push('/connect')
    } else {
      var urlParams = new URL(location.href).searchParams
      this.options.appid = urlParams.get('appid')
      this.options.channel = urlParams.get('channel')
      this.options.token = urlParams.get('token')
      this.options.uid = null
      if (this.options.appid && this.options.channel) {
        await this.joinchannel()
        this.toast.success('Party joined successfully')
        // document.getElementById("success-alert").style.display = "block";
        document.getElementById('join').style.display = 'none'
        document.getElementById('join').style.pointerEvents = 'none'
        document.getElementById('join').style.backgroundColor = 'gray'
        document.getElementById('leave').style.display = 'block'
        document.getElementById('leave').style.pointerEvents = 'auto'
        document.getElementById('leave').style.backgroundColor = '#7952b3'
        document.getElementById('audio_mute').style.display = 'block'
        document.getElementById('audio_mute').style.pointerEvents = 'auto'
        document.getElementById('audio_mute').style.backgroundColor = '#7952b3'
        document.getElementById('video_mute').style.display = 'block'
        document.getElementById('video_mute').style.pointerEvents = 'auto'
        document.getElementById('video_mute').style.backgroundColor = '#7952b3'
      } else {
        Party.get_party_by_user(this.account.toLowerCase())
          .then(async (res) => {
            console.log(res.data)
            if (res.data.msg == 'Success') {
              this.creator = res.data.creator != '' ? res.data.creator : 'My'
              this.options.appid = res.data.appid
              this.options.token = res.data.token
              this.options.channel = res.data.channel
              this.options.uid = 0
              console.log(this.options.channel)
              console.log(this.options.token)
              if (this.options.appid && this.options.channel) {
                await this.joinchannel()
                await this.getallusers()
                this.toast.success('Party joined successfully!')
                document.getElementById('my_friend_container').style.display =
                  'block'
                // document.getElementById("success-alert").style.display = "block";
                document.getElementById('join').style.display = 'none'
                document.getElementById('join').style.pointerEvents = 'none'
                document.getElementById('join').style.backgroundColor = 'gray'
                document.getElementById('leave').style.display = 'block'
                document.getElementById('leave').style.pointerEvents = 'auto'
                document.getElementById('leave').style.backgroundColor =
                  '#7952b3'
                document.getElementById('audio_mute').style.display = 'block'
                document.getElementById('audio_mute').style.pointerEvents =
                  'auto'
                document.getElementById('audio_mute').style.backgroundColor =
                  '#7952b3'
                document.getElementById('video_mute').style.display = 'block'
                document.getElementById('video_mute').style.pointerEvents =
                  'auto'
                document.getElementById('video_mute').style.backgroundColor =
                  '#7952b3'
              }
            } else {
              this.toast.info(`${res.data.msg}! Please create your party!`)
            }
          })
          .catch((err) => console.error(err))

        User.getUserInfo(this.account.toLowerCase(), this.vrcode)
          .then((resp) => {
            this.myname = resp.data.username
          })
          .catch((err) => console.error(err))
      }
    }
  },
  setup() {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

    const toast = useToast();

    return { toast, client }
  },
}
</script>

<style>
#container {
  text-align: center;
  margin: 0 auto;
}

.create-content-box {
  border: 1px solid gray;
  height: 350px;
}

#create {
  padding: 50px;
  margin-top: 100px;
}

#audio_mute {
  pointer-events: none;
  background-color: gray;
  display: none;
}

#video_mute {
  pointer-events: none;
  background-color: gray;
  display: none;
}

#leave {
  pointer-events: none;
  background-color: gray;
  display: none;
}

.banner {
  padding: 0;
  color: white;
}

.banner-text {
  padding: 8px 20px;
  margin: 0;
}

#join-form {
  margin-top: 10px;
}

.tips {
  font-size: 12px;
  margin-bottom: 2px;
  color: gray;
}

.join-Info-text {
  margin-bottom: 2px;
}

input {
  width: 100%;
  margin-bottom: 2px;
}

.player {
  width: 480px;
  height: 320px;
}

.player-name {
  margin: 8px 0;
  color: red;
}

#success-alert {
  display: none;
}

#success-alert {
  background-color: transparent;
  border-color: transparent;
}

#success-alert strong {
  font-size: 30px;
  color: red;
}

#my_friend_container {
  display: none;
}

span {
  color: white;
}

#remote {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  width: 100%;
  height: 550px;
  border: 1px solid none;
}

.listcontent {
  display: flex;
  align-items: center;
}

#invitebutton {
  text-align: right;
}
.button-group {
  display: flex;
  justify-content: center;
}

#my_video {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#invite_image {
  width: 25%;
  cursor: pointer;
  border-radius: 20px;
  background-color: #7952b3;
}
@media (max-width: 640px) {
  .player {
    width: 500px;
    height: 440px;
  }
}
</style>
