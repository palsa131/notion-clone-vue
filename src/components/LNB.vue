<template>
  <nav
    ref="nav"
    :style="{ width: `${navWidth}px`}">
    <div class="header">
      <div class="user-profile"></div>
      JeongHo's Notion
    </div>
    <ul>
      <WorkspaceItem
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace" />
    </ul>
    <div class="actions">
      <div
        class="action"
        @click="$store.dispatch('workspace/createWorkspace')">
        <span class="material-icons">add</span>새로운 페이지
      </div>
    </div>
    <div
      ref="resizeHandle"
      class="resize-handle"
      @dblclick="navWidth = 240 "></div>
  </nav>
</template>

<script>
import interact from 'interactjs'
import WorkspaceItem from '~/components/WorkspaceItem'

export default {
	components: {
		WorkspaceItem
	},
	data(){
		return {
			navWidth: 240
		}
	},
	computed: {
		workspaces(){
			return this.$store.state.workspace.workspaces
		}
	},
	created(){
		this.workspacesInit()
	},
	mounted(){
		this.navInit()
	},
	methods:{
		async workspacesInit(){
		await this.$store.dispatch('workspace/readWorkspaces')
		console.log(this.$store.state.workspace.currentWorkspacePath)
		},
		navInit(){
			interact(this.$refs.nav)
			.resizable({
				edges: {
					right: this.$refs.resizeHandle // 정확하게 resize-handle을 움직여야 resizemove 발생
				}
			})
			.on('resizemove', event =>{
				this.navWidth = event.rect.width //event의 rect 의 width를 navWidth로
				//localStorage에 저장하면 사용자가 지정한 너비로 시작하게 할수도
			})
		}
	}
}
</script>
<style lang="scss" scoped>

nav {
	max-width: 500px;
	min-width: 190px;
	flex-shrink: 0;
	height: 100%;
	background-color: $color-background;
	display: flex;
	flex-direction: column;
	position: relative;
	.header {
		padding: 14px;
		font-weight: 700;
		display: flex;
		align-items: center;
		.user-profile{
			width: 20px;
			height: 20px;
			border-radius: 4px;
			margin-right: 10px;
			background-image: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fca7qXd%2FbtqDvZDFG6p%2FUpLD0IVK445mL1RO5ZzlI1%2Fimg.png");
			background-size: cover;
		}
	}
	ul{
		flex-grow: 1;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.actions{
		border-top: 1px solid $color-border;
		.action{
			height: 45px;
			display: flex;
			align-items: center;
			padding: 0 14px;
			color: $color-icon;
			cursor: pointer;
			&:hover {
				background-color: $color-background--hover1
			}
			.material-icons{
				margin-right: 4px;
				color: $color-icon;
			}
		}
	}
	.resize-handle{
		width: 4px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		cursor: col-resize;
		transition: .4s;
		&:hover{
			background-color: $color-border;
		}
	}
}
	
</style>