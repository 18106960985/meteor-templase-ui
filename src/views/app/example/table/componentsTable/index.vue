<!--综合表格全部操作集中在一起demo-->
<template>
  <!--组件内容-->
  <div class="app-container calendar-list-container">
    <!--工具栏-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleSearch" style="width: 200px;" class="filter-item" :placeholder="$t('table.name')" v-model="tableQuery.name">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" v-waves  @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" v-waves  :loading="loading.downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <el-checkbox class="filter-item"  style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="show.desciption">备注</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+2' v-model="show.updTime">更新时间</el-checkbox>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+3' v-model="show.updName">更新人</el-checkbox>
    </div>

    <!--表格-->
    <el-table :key='tableKey' :data="table" v-loading="loading.tableLoading" element-loading-text="$t('loading.tableLoading')" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="账户">
        <template slot-scope="scope">
          <span>{{scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex  | sexFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="show.desciption" width="300" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="show.updTime" width="180"  align="center" label="最后时间">
        <template slot-scope="scope">
          <span>{{scope.row.updTime}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="show.updName" width="200" align="center" label="最后更新人">
        <template slot-scope="scope">
          <span>{{scope.row.updName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button  type="danger"   size="mini" @click="handleDelete(scope.row)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--分页-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[10,20,30, 50]" :page-size="tableQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>

</template>

<script>
  import {page, addObj, putObj} from '@/api/example/table/index'
  import waves from '@/directive/waves' // 水波纹指令
    export default {
        name: "complex-table",
      directives: {
        waves
      },
      data(){
          return {
            loading:{
              tableLoading: false,
              downloadLoading: false,
            },
            table:[],
            tableKey:0,
            tableQuery:{
              name: undefined,
              page:1,
              limit:15,
              sort: '+id'
            },
            show:{
              updTime: false,
              desciption: false,
              updName: false,
            },
            total:0,
          }
      },
      created(){
        this.getTable();
      },
      filters:{
          //性别过滤器
          sexFilter(val){
            let sex = '未知';
            switch(val){
              case 1:
                 sex = '男';
                 break;
              case 2:
                 sex = '女';
                 break;
            }
            return sex;
          }

      },
      methods:{
          //获取表格
          getTable(){
            this.loading.tableLoading = true;
            page(this.tableQuery).then(res=>{
              let data = res.data;

              this.table = data.items;
              this.total = data.total;
              this.loading.tableLoading = false;

            })
          },
          //数据查询
          handleSearch(){

          },
          // Excel导出
          handleDownload(){

          },
          //add
          handleCreate(){

          },
          //更新
          handleUpdate(row){

          },
          // 删除
          handleDelete(row){
            this.loading.tableLoading = true;
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              const index = this.list.indexOf(row)
              this.table.splice(index, 1)
            this.loading.tableLoading = false;
          },
          //分页大小
          handleSizeChange(){

          },
          //分页设置
          handleCurrentChange(){

          }



      }
    }
</script>

<style scoped>

</style>
