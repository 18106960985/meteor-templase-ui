<template>
  <el-dialog :title="textMap[isEdit]"   :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="账户" prop="account">
        <el-input v-if="!isEdit" v-model="form.account" placeholder="请输入账户"></el-input>
        <el-input v-else v-model="form.account" placeholder="请输入账户" readonly></el-input>
      </el-form-item>
      <el-form-item v-if="!isEdit" label="密码" placeholder="请输入密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select class="filter-item" v-model="form.sex" placeholder="请选择">
          <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button v-if="!isEdit" type="primary" @click="addObj">创 建</el-button>
      <el-button v-else type="primary" @click="putObj">更 新</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import {getTable,addObj, putObj} from "@/api/example/table";

  const defaultForm ={
        id:undefined,
        name:undefined,
        account:undefined,
        password:undefined,
        sex: 0,
        description:undefined,
      }

    export default {
        name: "table-form",
      props:{
        isEdit:{
          type:Boolean,
          default:false
        },
        dialogFormVisible:{
          type: Boolean,
          default: false
        },
        id:Number, //表单的ID或者查询关键字作为表单查询的KEY
      },
      data(){
          return {
            form: Object.assign({},defaultForm),
            loading:{
              submitLoading: false,
            },
            textMap: {
              true: '编辑',
              false: '创建'
            },
            sexOptions: [ '未知','男', '女'],
            formRules:{

            }
          }
      },
      created(){
          if(this.isEdit){
            this.fetchData();
          }else{
            this.form = Object.assign({},defaultForm);
          }
      },
      methods:{
          //以下是交互事件
          changeForm(){
            this.$emit('change');
          },
          cancel(){
            this.$set(this.dialog,'dialogFormVisible', false);
            this.changeForm();
          },

          //获取表单数据 以下是因为是模拟数据所以具体请参考实例
          fetchData(){
            getTable(this.id).then( res=>{
              this.form = res.data;
              this.$message.success('以下是因为是模拟数据所以具体请参考实例')
            })
          },
          addObj(){
            addObj(this.form).then( res=>{
              console.log(res.data)
              this.$notify({
                title:'成功',
                message:res.data.message,
                type:'success'
              })
            })
            this.cancel();
          },
          putObj(){
            putObj(this.form).then( res=>{
              console.log(res.data)
              this.$notify({
                title:'成功',
                message:res.data.message,
                type:'success'
              })
            })
            this.cancel();
          }
      }
    }
</script>

<style scoped>


</style>
