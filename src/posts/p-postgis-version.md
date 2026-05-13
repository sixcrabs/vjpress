---
title: PostGIS 版本查询 SQL
date: 2025-06-24
tags: ["postgres","postgis"]
outline: deep
---

#  PostGIS 版本查询 SQL

<PostMeta />

很多服务都对`postgis`版本号有要求，一般都是需要 postgis 3.1+,因此查询 postgis版本是个经常需要做的操作，收集了几种查询版本号的SQL写法，如下：

## 查询 PostGIS 版本号

```sql
SELECT PostGIS_Version();
```

## 查询 PostGIS 完整版本信息

```sql
select PostGIS_full_version();
```

## 查询 PostgreSQL 系统表中的 PostGIS 扩展信息

```sql
SELECT * FROM pg_extension WHERE extname = 'postgis';
```

## 查询 PostGIS 库的版本号

```sql
SELECT PostGIS_Lib_Version();
```

<PostNav />
