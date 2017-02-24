<template lang="html">
  <div id="ListWithFiltersPage">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <div class="db-content-inner">

      <!-- filters start -->
      <div class="filters">

        <div class="filter">
          姓名：
          <el-input
            placeholder="请输入姓名"
            v-model="filters.userName">
          </el-input>
        </div>
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table
        :data="users"
        v-loading="loading"
        element-loading-text="拼命加载中"
        stripe
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        ref="table"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          :formatter="formatDate"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          width="150"
          prop="mobile"
          label="手机号">
        </el-table-column>
        <el-table-column
          :context="_self"
          width="90"
          inline-template
          label="头像">
          <img class="user-img" :src="row.imgUrl" :style="{ width: '48px'}" alt="" />
        </el-table-column>
        <el-table-column
          prop="address"
          label="城市">
        </el-table-column>
        <el-table-column
          prop="ticket"
          label="优惠券">
        </el-table-column>
        <el-table-column
          prop="status"
          label="中奖状态">
        </el-table-column>
        <el-table-column
        :context="_self"
        width="100"
        inline-template
        label="操作">
        <div>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete($index, row)">
            删除
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
          :total="total">
        </el-pagination>
      </div>
      <!-- pagination end  -->

      <!-- edit dialog start -->
      <el-dialog custom-class="edit-dialog" title="编辑" v-model="editDialog" size="tiny">
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="数量">
            <el-input v-model="editForm.num" class="el-col-24"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditSave()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- edit dialog end -->

  </div>
</template>

<script>
import {
  fetchList,
  editUser
} from './../../api/api';

// import moment from 'moment';
// import Vue from 'vue';

export default {
  data() {
    return {
      users: [],
      total: 0,
      page: 0,
      loading: true,
      multipleSelection: [],
      editDialog: false,
      createDialog: false,
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
      }
    };
  },

  methods: {
    formatDate(row) {
      return new Date(row.date).toLocaleDateString();
    },
    handleSortChange(sortWay) {
      this.filters.sortWay = {
        prop: sortWay.prop,
        order: sortWay.order
      };
      this.fetchData();
    },

    handleEditSave() {
      editUser(this.editForm).then(() => {
        this.fetchData();
        this.editDialog = false;

        this.$message({
          message: '编辑成功',
          type: 'success'
        });
      });
    },

    handleDelete($index, row) {
      console.log('delete');
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSearch() {
      this.fetchData();
    },

    handleCurrentChange(val) {
      this.fetchData(val);
    },

    fetchData(page) {
      // param: sort way
      let sortWay = this.filters.sortWay && this.filters.sortWay.prop ? this.filters.sortWay : '';

      // param: page
      this.page = page || this.page;

      let options = {
        page: this.page,
        userName: this.filters.userName,
        sortWay: sortWay
      };

      console.log('[dashboard]:your post params');
      console.log(options);

      this.loading = true;
      fetchList(options).then((res) => {
        // clear selection
        this.$refs.table.clearSelection();

        // lazy render data
        this.users = res.data.users;
        this.total = res.data.total;
        this.loading = false;
      });
    }
  },

  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="less">
#ListWithFiltersPage {
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

  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
}
</style>
