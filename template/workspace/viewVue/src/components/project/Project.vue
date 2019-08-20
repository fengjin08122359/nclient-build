<template>
  <div class="project">
    <span @click="display">新增</span>
    <span @click="refresh">刷新</span>
    <div v-for="(item, index) in list" :key="index" >
      <el-button-group>
        <el-button @click="switchTarget(item)" :class="{active: item==target}">{{item.name}}</el-button>
        <el-button @click="start(item.name)">启动</el-button>
        <el-button @click="stop(item.name)">停止</el-button>
        <el-button @click="del(item.name)">删除</el-button>
        <el-button @click="build(item.name)">发包</el-button>
      </el-button-group>
    </div>
    <el-input v-model='project.distpath'>
      <template slot="prepend">distpath</template>
    </el-input>
    <Starter :target='target'></Starter>
    <el-dialog title="新增项目" :visible.sync="addVisible">
      <el-input v-model="name"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false;add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Starter from '../starter/Starter.vue'
import handle, { project } from "./project";
export default {
  name: 'Project',
  data() {
    return {
      project: project,
      target: null,
      addVisible:false,
      name: ''
    }
  },
  computed: {
    list () {
      return project.list
    }
  },
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
  },
  methods: {
    del(name) {
      handle.remove(name)
    },
    start (name) {
      handle.start(name)
    },
    stop (name) {
      handle.stop(name)
    },
    build(name) {
      handle.build(name)
    },
    switchTarget (item) {
      this.target = item
    },
    display () {
      this.addVisible = true
    },
    refresh () {
      handle.refresh()
    },
    add () {
      if (this.name == ''){
        this.$message({
          message: '未填写项目名称',
          type: 'warning'
        });
      } else if (this.name.match(/[^\w\.\/]/ig)) {
        this.$message({
          message: '仅能输入英语',
          type: 'warning'
        });
      } else {
        handle.add(this.name)
      }
    }
  },
  components: {Starter}
}
</script>

<style>
.project .active{
  color: red;
}
</style>
