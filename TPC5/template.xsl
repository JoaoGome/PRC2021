<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl"
    exclude-result-prefixes="xd"
    version="2.0">
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <!-- TEMPLATE PARA INPROCEEDINGS .......... -->
    <xsl:template match="//inproceedings">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :inproceedings ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    <!-- TEMPLATE PARA PROCEEDINGS .......... -->
    <xsl:template match="//proceedings">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :proceedings ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    
    <!-- TEMPLATE PARA INBOOK.......... -->
    <xsl:template match="//book">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :inbook ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    
    <!-- TEMPLATE PARA BOOK .......... -->
    <xsl:template match="//inbook">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :book ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    
    <!-- TEMPLATE PARA PROCEEDINGS .......... -->
    <xsl:template match="//article">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :article ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    
    <!-- TEMPLATE PARA MISC .......... -->
    <xsl:template match="//misc">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :misc ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    
    <!-- TEMPLATE PARA PHDTHESIS .......... -->
    <xsl:template match="//phdthesis">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :phdthesis ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    
    <!-- TEMPLATE PARA MASTERTHESIS .......... -->
    <xsl:template match="//masterthesis">
        ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :masterthesis ;<xsl:apply-templates mode="principal" select="."/>
    </xsl:template>
    
    <xsl:template match="." mode="principal">
        <xsl:for-each select="author">
            :hasAuthor :<xsl:value-of select="@id"/> ;</xsl:for-each>
        <xsl:for-each select="author-ref">
            :hasAuthor :<xsl:value-of select="@authorid"/> ;</xsl:for-each>
        <xsl:if test="address">
            :address "<xsl:value-of select="address"/>"</xsl:if>  
        <xsl:if test="booktitle"> ;
            :booktitle "<xsl:value-of select="booktitle"/>"</xsl:if>    
        <xsl:if test="chapter"> ;
            :chapter "<xsl:value-of select="chapter"/>"</xsl:if>
        <xsl:if test="doi"> ;
            :doi "<xsl:value-of select="doi"/>"</xsl:if>
        <xsl:if test="howpublished"> ;
            :howpublished "<xsl:value-of select="howpublished"/>"</xsl:if>
        <xsl:if test="isbn"> ;
            :isbn "<xsl:value-of select="isbn"/>"</xsl:if> 
        <xsl:if test="issn"> ;
            :issn "<xsl:value-of select="issn"/>"</xsl:if>
        <xsl:if test="journal"> ;
            :journal "<xsl:value-of select="journal"/>"</xsl:if>
        <xsl:if test="month"> ;
            :month "<xsl:value-of select="month"/>"</xsl:if>
        <xsl:if test="year"> ;
            :year "<xsl:value-of select="year"/>"</xsl:if>
        <xsl:if test="number"> ;
            :number "<xsl:value-of select="number"/>"</xsl:if>
        <xsl:if test="pages"> ;
            :pages "<xsl:value-of select="pages"/>"</xsl:if>
        <xsl:if test="deliverables/pdf/@url"> ;
            :pdf "<xsl:value-of select="deliverables/pdf/@url"/>"</xsl:if>
        <xsl:if test="publisher"> ;
            :publisher "<xsl:value-of select="publisher"/>"</xsl:if>
        <xsl:if test="school"> ;
            :school "<xsl:value-of select="school"/>"</xsl:if>
        <xsl:if test="title"> ;
            :title "<xsl:value-of select="title"/>"</xsl:if>
        <xsl:if test="volume"> ;
            :volume "<xsl:value-of select="volume"/>"</xsl:if> .
        
        <xsl:for-each select="author">
            ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
            :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
            :author ;
            :nome "<xsl:value-of select="translate(node(), ' ','_')"/>" .
        </xsl:for-each>
        
        <xsl:for-each select="editor">
            ###  http://www.di.uminho.pt/prc2021/tpc5#<xsl:value-of select="@id"/>
            :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
            :editor ;
            :nome "<xsl:value-of select="translate(node(), ' ','_')"/>" .
        </xsl:for-each>
        
    </xsl:template>
</xsl:stylesheet> 
    


