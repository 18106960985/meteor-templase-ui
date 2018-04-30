<template>
  <div class="app-container calendar-list-container">
    <!--搜索工具栏-->
    <div class="filter-container">
      <el-input @keyup.enter.native="getTable" style="width: 200px;" class="filter-item" placeholder="表名" v-model="tableQuery.tableName" />

      <el-button class="filter-item" type="primary"  v-waves  icon="el-icon-search" @click="getTable">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="loading.downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>

    </div>
    <!--表格开始-->

    <el-table :key='tableKey' :data="table" v-loading="loading.tableLoading" element-loading-text="给我一点时间" border fit highlight-current-row @selection-change="handleSelectionChange"
              style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column width="" align="center" :label="$t('table.tableName')">
        <template slot-scope="scope">
          <span>{{scope.row.tableName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" :label="$t('table.tableComment')">
        <template slot-scope="scope">
          <span>{{scope.row.tableComment}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" :label="$t('table.createTime')">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column fixed="right" align="center" :label="$t('table.actions')" width="250">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">-->
     <!---->
          <!--</el-button>-->
   <!---->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <!--分页-->
    <div v-show="!loading.tableLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="tableQuery.offset" :page-sizes="[10,20,30, 50]" :page-size="tableQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>


  </div>

</template>
<script>
  require('script-loader!file-saver');
  import JSZip from 'jszip'
  import waves from '@/directive/waves' // 水波纹指令
  import {getPage, exportCode} from '@/api/generatorCode/index'
    export default {
        name: "generator-code-index",
      directives: { //按钮动画
        waves
      },
      data(){
          return {

            //遮盖层
            loading:{
              tableLoading: false,
              downloadLoading:false,
            },
            tableQuery:{
              tableName:'',
              limit:15,
              offset: 1,
            },
            //表格属性
            table:[],
            tableKey:0,
            total:0,
            tableNames:[],
          }
      },
      created(){
          this.getTable();
      },
      methods:{
         getTable(){
           //后台偏移量有问题
           this.tableQuery.offset --;
           this.loading.tableLoading = true;
           getPage(this.tableQuery).then( res=>{
             if(res.data.status == 200){
               this.table = res.data.tableData.rows;
               this.total = res.data.tableData.total;
               this.loading.tableLoading = false;
             }else{
               this.$notify({
                 title:'失败',
                 message:"获取失败",
                 type:'error'
               })
             }

           });
         },
        handleSizeChange(val){
          this.tableQuery.limit = val;
          this.getTable();
        },
        handleCurrentChange(val) {
          this.tableQuery.offset = val;
          this.getTable();
        },
        handleSelectionChange(val){
          this.tableNames = val;
        },
        handleDownload(){
          let tempList =     this.tableNames.map( (item,value)=>{
             return item.tableName;
           })
          exportCode(tempList);
        }
      }
    }
</script>

<style scoped>

</style>
