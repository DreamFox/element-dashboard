<template>
  <div id="big-form">
    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->
    <div class="db-content-inner">

      <!-- filters start -->
      <div class="filters">

        <div class="filter">
          预计活动人数：
          <el-input
            placeholder="请输入姓名"
            v-model="form.activityPersons">
          </el-input>
        </div>
        <div class="filter">
          每人最多抽奖次数：
          <el-input
            placeholder="请输入姓名"
            v-model="form.mostDraw">
          </el-input>
        </div>
        <el-button type="primary" @click="submit()">保存</el-button>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table
        :data="awardList"
        v-loading="loading"
        element-loading-text="拼命加载中"
        stripe
        ref="table"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="奖品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="奖品类型">
        </el-table-column>
        <el-table-column
          prop="totalnum"
          label="总数">
        </el-table-column>
        <el-table-column
          prop="leftnum"
          label="剩余数量">
        </el-table-column>
        <el-table-column
          :context="_self"
          width="100"
          inline-template
          label="图片">
          <img class="user-img" :src="row.image" :style="{ width: '60px'}" alt="" />
        </el-table-column>
        <el-table-column
          :context="_self"
          width="100"
          inline-template
          label="操作">
          <div>
            <el-button
              size="small"
              @click="handleEdit(row)">
              编辑总数
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- table end  -->

      <!-- pagination start  -->
      <div class="pagination-wrapper">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20"
          :total="awardList.length">
        </el-pagination>
      </div>
      <!-- pagination end  -->
      <!-- edit dialog start -->
      <el-dialog custom-class="edit-dialog" title="编辑" v-model="editDialog" size="tiny">
          <div @keyup.enter="editSave(totalnum)">
            数量：<el-input v-model="totalnum"></el-input>
          </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="editSave(totalnum)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- edit dialog end -->
  </div>

  </div>
</template>

<script>
import {
  fetchAwardList,
  saveActivity
} from '../../api/api';

export default {
  data() {
    return {
      totalnum: 0,
      users: [],
      page: 0,
      loading: true,
      multipleSelection: [],
      createDialog: false,
      current: {},
      filters: {
        sortWay: '',
        userName: '',
        startEndTime: ''
      },
      editForm: {
        num: ''
      },
      createForm: {
        name: '',
        time: ''
      },
      awardList: [],
      form: {
        activityPersons: 0,
        mostDraw: 0
      },
      editDialog: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // get data from server
    getData() {
      fetchAwardList().then(data => {
        let { code, list } = data;
        if (code === 200) {
          this.awardList = list;
        }
        this.loading = false;
      });
    },

    handleCurrentChange(val) {
      this.fetchData(val);
    },

    handleEdit(row) {
      this.editDialog = true;
      this.current = row;
      console.log(this.totalnum, row.totalnum);
      this.totalnum = row.totalnum;
    },
    editSave(data) {
      this.editDialog = false;
      this.current.totalnum = data;
      console.log('save');
    },
    submit() {
      saveActivity(this.form).then(data => {
        this.$message({
          type: 'success',
          message: '创建成功'
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
#big-form {
  .edit-dialog {
      .el-dialog__body {
        overflow: auto;
      }
  }
  .db-content-inner .user-img {
    width: 100px;
  }
  .filters {
    margin: 0 0 20px 0;
    border: 1px #efefef solid;
    padding: 10px;
    background: #f9f9f9;

    .filter {
      display: inline-block;
      width: auto;
      padding: 10px;
      border-radius: 5px;
    }
    .el-input {
      width: 150px;
      display: inline-block;
    }
  }

  .el-input {
    width: 150px;
    display: inline-block;
  }
  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
  .el-form {
    width: 600px;

    .skill-line {
      margin: 10px 0;
    }
  }
  .desc-hint {
    margin: 5px 0;
    font-size: 14px;
    color: #bbb;
    line-height: 1.5;
  }
}
</style>
